// import App from "./App";
// import React from "react";
// import { StaticRouter } from "react-router-dom";
import express from "express";
// import { renderToString } from "react-dom/server";
import { sortBy } from "lodash";
import { OrderedMap } from "immutable";

import fs from "fs";
import path from "path";
import { exec } from "child_process";

import { promisify } from "util";

const readdirAsync = promisify(fs.readdir);
const statAsync = promisify(fs.stat);
const execAsync = promisify(exec);

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

async function makeTree(acc, p, stripPrefix) {
  if (
    /node_modules/.test(p) ||
    /logs/.test(p) ||
    /description/.test(p) ||
    /config/.test(p) ||
    /COMMIT_EDITMSG/.test(p) ||
    /ORIG_HEAD/.test(p) ||
    /hooks/.test(p) ||
    /info/.test(p)
  ) {
    return acc;
  }
  const stat = await statAsync(p);
  if (!stat.isDirectory()) {
    try {
      const { stdout } = await execAsync(`sh -c 'git hash-object "${p}"'`);
      const hash = stdout.substring(0, 7);
      const parts = p.slice(stripPrefix.length).split("/");
      const [filename, up] =
        parts.length === 1
          ? [parts[0], ["<root>"]]
          : [parts[parts.length - 1], parts.slice(0, -1)];

      return acc.updateIn(
        up,
        oldVal =>
          oldVal
            ? oldVal.set(filename, hash)
            : new OrderedMap({ [filename]: hash })
      );
    } catch (ignored) {
      console.error(ignored.message);
      console.log({ acc });
    }
    return acc;
  }

  try {
    const files = await readdirAsync(p);
    const sortedFiles = sortBy(files);
    let loopAcc = acc;
    for (let file of sortedFiles) {
      loopAcc = await makeTree(loopAcc, path.join(p, file), stripPrefix);
    }
    return loopAcc;
  } catch (ignored) {
    console.error({ ignored });
  }
  return acc;
}

const server = express();
server
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get("/api", async (req, res) => {
    const tree = await makeTree(
      new OrderedMap({}),
      "../../hello-git",
      "../../hello-git"
    );
    res.json(tree.toJS());
  })
  .get("/*", (req, res) => {
    const context = {};
    // const markup = renderToString(
    //   <StaticRouter context={context} location={req.url}>
    //     <App />
    //   </StaticRouter>
    // );
    const markup = "";

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(
        `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <title>Welcome to Razzle</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${
          assets.client.css
            ? `<link rel="stylesheet" href="${assets.client.css}">`
            : ""
        }
        ${
          process.env.NODE_ENV === "production"
            ? `<script src="${assets.client.js}" defer></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
    </head>
    <body>
        <div id="root">${markup}</div>
    </body>
</html>`
      );
    }
  });

export default server;
