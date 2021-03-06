import React from "react";
// import Route from "react-router-dom/Route";
// import Switch from "react-router-dom/Switch";
// import Home from "./Home";
import "./App.css";

import Home from "./Home";

import gitTree from "./git-tree.png";
import gitMerge from "./git-merge.png";

import {
  Fill,
  Image,
  Layout,
  CodePane,
  Deck,
  Slide,
  Appear,
  Heading,
  List,
  ListItem,
  Notes,
  Text
} from "spectacle";

import createTheme from "spectacle/lib/themes/default";

const Blob = () => (
  <span role="img" aria-label="blob">
    📄
  </span>
);
const Tree = () => (
  <span role="img" aria-label="tree">
    🌳
  </span>
);
const Commit = () => (
  <span role="img" aria-label="commit">
    📸
  </span>
);
const AnnotatedTag = () => (
  <span role="img" aria-label="annotated tag">
    🏷
  </span>
);

class App extends React.Component {
  render() {
    return (
      <Deck theme={createTheme({}, { primary: "monospace" })}>
        <Slide>
          <Heading fit={true}>GIT</Heading>
          <Text>TODO: stash is also just a branch</Text>
          <Text>
            stash, commit, ref everything can be used as tree-ish/refspec
          </Text>
          <Notes>
            <ul>
              <li>Har i nogensinde kigget i .git-mappen?</li>
              <li>blockchain</li>
            </ul>
          </Notes>
        </Slide>
        <Slide>
          <Text>Er en DAG</Text>
          <Appear>
            <Text>Er en blockchain*</Text>
          </Appear>
          <Appear>
            <Text>...med forgreninger</Text>
          </Appear>
          <Appear>
            <Text>dvs et Merkle tree</Text>
          </Appear>
        </Slide>
        <Slide>
          <Heading>Hvad</Heading>
          <List>
            <ListItem>Hvad er git objects</ListItem>
            <ListItem>Hvad er git refs</ListItem>
          </List>
        </Slide>
        <Slide>
          <Heading>Hvordan</Heading>
          <List>
            <ListItem>Fungerer git merge</ListItem>
            <ListItem>Fungerer git rebase</ListItem>
            <ListItem>Synkroniserer man med remotes</ListItem>
          </List>
        </Slide>

        <Slide>
          <Heading fit={true}>.git/objects</Heading>
          <Text>object-database</Text>
          <Text>key => value</Text>
          <Text>hash => object</Text>
          <Text>4c2df2 => &lt;commit></Text>
          <Appear>
            <Text textAlign="left">type: $ git cat-file -t &lt;hash></Text>
          </Appear>
          <Appear>
            <Text textAlign="left">print: $ git cat-file -p &lt;hash></Text>
          </Appear>
        </Slide>
        <Slide>
          <Heading textAlign="left">
            <Blob /> blob
          </Heading>
          <Heading textAlign="left">
            <Tree /> tree
          </Heading>
          <Heading textAlign="left">
            <Commit /> commit
          </Heading>
          <Heading textAlign="left">+1 ...</Heading>
        </Slide>

        <Slide>
          <Heading>
            <Blob /> blob
          </Heading>
          <Layout>
            <Fill>
              <Appear>
                <Text>Rå data, typisk fil-indhold</Text>
              </Appear>
              <Appear>
                <Text>"Leaf" i grafen</Text>
              </Appear>
              <Appear>
                <Text>git add</Text>
              </Appear>
            </Fill>
          </Layout>
        </Slide>

        <Slide>
          <Heading fit={true}>Demo</Heading>
          <Text>blob, git init</Text>
        </Slide>

        <Slide>
          <Layout>
            <Fill textAlign="left" bgColor="#333" textSize="10pt">
              <Home />
            </Fill>
          </Layout>
        </Slide>

        <Slide>
          <Heading>
            <Tree /> tree
          </Heading>
          <Layout>
            <Fill textAlign="left">
              <Text textAlign="left">
                En enkelt mappe med navne og fil-system-attributter på filer og
                undermapper
              </Text>
              <Text textAlign="left">Links</Text>
              <List>
                <ListItem>
                  <Tree /> tree(s)
                </ListItem>
                <ListItem>
                  <Blob /> blob(s)
                </ListItem>
              </List>
            </Fill>
          </Layout>
        </Slide>

        <Slide>
          <Tree /> -> [<Tree /> -> ..., <Blob />]
        </Slide>

        <Slide>
          <Text>git cat-file -p be02fb4</Text>
          <CodePane
            source={`100644 blob 0328aa4232b630476696737d887efa3a203f9cdd	.dockerignore
100644 blob d4eed8406b05fc41f3ff65cb8c5fb6febf7fb7bb	.editorconfig
100644 blob cd9282cd1374dfc334be3fc33e37fe2b2a137607	.eslintignore
100644 blob df2d025ccff5fc8ba8fb026f5bc52baac80c12af	.eslintrc
100644 blob a29125a8eca7691298d3b1d63025df7d9108ec7b	.gitattributes
100644 blob b8b1e991bd58181ebf73c89a096499e6c9996994	.gitignore
100644 blob 4aeeeb4b809efb5bcc2862abd243ef560dd4cc49	.stylelintrc
100644 blob b6a67d1ec843cbb8ac97422da519a85d7b01fb72	Dockerfile
100644 blob 643377bd46447b7bb5d737fc4cc4901bcdf9c257	Jenkinsfile
100644 blob c130d941ee7c194905dbbaa7a49fef5cfeb27789	README.md
040000 tree e8efc6588fb0baee8afdc16d2bfc1f7f150022ee	config
040000 tree 88f0d47379d1c8287425042de0b4b1737ed7804d	deployment
100644 blob e02fb1dd487d50520dc55a5b05d396badc4b1593	docker-compose.yml
100644 blob 62464f6449b9079bc4f4f8554df0662db0496b7f	jsconfig.json
040000 tree 3e0a06d3f57dc2728a3ab9e1abb6ccd7e168bd6b	lib
100644 blob f50df9113495fa0da4fb88f60cebb369a636df15	package-lock.json
100644 blob 76be443bf2f154b6032c3c8d3612c832d2eac2b7	package.json
100644 blob cc2d41ed9820b8aefe1c1c2d79756f6e19e70500	pm2.yaml
040000 tree 38a2341d2298b52023da6025047ad542304f847a	public
040000 tree 1d217faf5e0674bb0c702e713f178b68fe379868	scripts`}
          />
        </Slide>

        <Slide>
          <Image src={gitTree} />
        </Slide>

        <Slide>
          <Heading>
            <Commit /> commit
          </Heading>
          <Layout>
            <Fill textAlign="left">
              <List>
                <ListItem>Timestamp</ListItem>
                <ListItem>Forfatter</ListItem>
                <ListItem>Committer</ListItem>
                <ListItem>Besked</ListItem>
              </List>
              <Text textAlign="left">Links</Text>
              <List>
                <ListItem>
                  <Tree /> 1 tree
                </ListItem>
                <ListItem>
                  <Commit /> commit(s)
                </ListItem>
              </List>
            </Fill>
          </Layout>
        </Slide>

        <Slide>
          <Commit /> -> (<Tree /> -> [<Tree /> -> ..., <Blob />]) -> <Commit />{" "}
          -> ...
          <Text>git commit -m "Second commit"</Text>
        </Slide>

        <Slide>
          <Text>git cat-file -p e88c187</Text>
          <CodePane
            textSize="18px"
            source={`tree 85a099317936a855c22270c19e9d433fc373f5ee
parent 9dccfb9fbe6a40257b9d883fc1f7d339af011e11
author Sune Kibsgaard <sune@kibs.dk> 1517911520 +0100
committer Sune Kibsgaard <sune@kibs.dk> 1517911520 +0100

velour 1.0.59`}
          />
        </Slide>

        <Slide>
          <Heading>log</Heading>
          {Array.from({ length: 117 })
            .fill()
            .map((x, i) => (
              <span key={i}>
                <Commit /> ->{" "}
              </span>
            ))}
          root <Commit />
        </Slide>

        <Slide>
          <Heading fit={true}>Demo</Heading>
          <Text>tree, commit</Text>
        </Slide>

        <Slide>
          <Layout>
            <Fill textAlign="left" bgColor="#333" textSize="10pt">
              <Home />
            </Fill>
          </Layout>
        </Slide>

        <Slide>
          <Heading>.git/index ?</Heading>
          <Appear>
            <Text>"cache", "index", "staging area"</Text>
          </Appear>
        </Slide>

        <Slide>
          <Heading>refs</Heading>
          <Text>.git/refs</Text>
          <Appear>
            <Text>Fordi mennesker ikke kan huske 98a64844e48...</Text>
          </Appear>
          <Appear>
            <Text>git checkout -b new-branch</Text>
          </Appear>
          <Appear>
            <Text>git checkout old-branch</Text>
          </Appear>
        </Slide>

        <Slide>
          <Heading>head</Heading>
          {Array.from({ length: 7 })
            .fill()
            .map((x, i) => (
              <Appear order={8 - i} key={i}>
                <span>
                  <Commit key={i} /> ->{" "}
                </span>
              </Appear>
            ))}
        </Slide>

        <Slide>
          <Heading>.git/HEAD</Heading>
        </Slide>

        <Slide>
          <Heading fit={true}>DEMO</Heading>
          <Text>refs, undermapper</Text>
        </Slide>

        <Slide>
          <Layout>
            <Fill textAlign="left" bgColor="#333" textSize="10pt">
              <Home />
            </Fill>
          </Layout>
        </Slide>

        <Slide>
          <Heading>remote</Heading>
          <Text>git clone git@github.com:tv2/play-frontend-web.git</Text>
          <Text>---</Text>
          <Text>
            git remote add origin git@github.com:tv2/play-frontend-web.git
          </Text>
        </Slide>

        <Slide>
          <Heading fit={true}>Demo</Heading>
          <Text>fetch, pull, push, tracking</Text>
        </Slide>

        <Slide>
          <Layout>
            <Fill textAlign="left" bgColor="#333" textSize="10pt">
              <Home />
            </Fill>
          </Layout>
        </Slide>

        <Slide>
          <Heading>merge</Heading>
          <Text>tegn det</Text>
        </Slide>

        <Slide>
          <Image src={gitMerge} />
        </Slide>

        <Slide>
          <Heading>rebase</Heading>
          <Text>for forfængeligheden</Text>
          <Appear>
            <Text>
              Man kan ikke *omskrive* historien, men man kan skrive en *ny*
              historie
            </Text>
          </Appear>
        </Slide>

        <Slide>
          <Heading>rebase</Heading>
          <Text>for forfængelighed</Text>
          <Appear>
            <Text>
              Man kan ikke *omskrive* historien, men man kan skrive en *ny*
              historie
            </Text>
          </Appear>
        </Slide>

        <Slide>
          <Text>git commit --amend -m "Better message"</Text>
        </Slide>

        <Slide>
          <Text>git rebase -i HEAD~4</Text>
        </Slide>

        <Slide>
          <Text>git pull --rebase</Text>
        </Slide>

        <Slide>git push --force-with-lease</Slide>

        <Slide>
          <Heading>GitHub squash merge</Heading>
          <List>
            <Text>+ Simple history</Text>
            <Text>+ Realistic revert</Text>
            <Text>- git confused</Text>
            <Text>- branch-branches confused after merge</Text>
          </List>
        </Slide>

        <Slide>InteliiJ</Slide>

        <Slide>
          <Heading>
            <AnnotatedTag /> (annotated) tag
          </Heading>
          <Layout>
            <Fill textAlign="left">
              <Heading size={5} textAlign="left">
                Indhold
              </Heading>
              <Text textAlign="left">
                En reference til et commit og en besked
              </Text>
              <Heading size={5} textAlign="left">
                Links
              </Heading>
              <List>
                <ListItem>
                  <Commit /> 1 commit
                </ListItem>
              </List>
            </Fill>
          </Layout>
        </Slide>

        <Slide>
          (<AnnotatedTag /> ->) <Commit /> -> <Tree /> -> [<Tree /> -> ...,{" "}
          <Blob />]
        </Slide>

        <Slide>
          <Heading fit={true}>FIN</Heading>
        </Slide>
      </Deck>
    );
  }
}

export default App;
