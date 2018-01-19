import React, { Component } from "react";
import { isObject } from "lodash";
import "./Home.css";

import { isEqual, difference, intersection, sortBy } from "lodash";

function change(ch, obj) {
  if (isObject(obj)) {
    return sortBy(Object.keys(obj)).reduce(
      (acc, key) => ({
        ...acc,
        [key]: { change: ch, value: change(ch, obj[key]) }
      }),
      {}
    );
  }

  return obj;
}

function diffObject(from, to) {
  if (from === to) {
    return change("same", from);
  }

  if (isObject(from) && isObject(to)) {
    const fKeys = sortBy(Object.keys(from));
    const tKeys = sortBy(Object.keys(to));
    const sameKeys = intersection(fKeys, tKeys);
    const removedKeys = difference(fKeys, tKeys);
    const addedKeys = difference(tKeys, fKeys);

    const same = sameKeys.map(key => {
      const fVal = from[key];
      const tVal = to[key];
      const change =
        typeof fVal === "string" && fVal !== tVal ? "modify" : "same";
      return {
        key,
        change,
        value: diffObject(fVal, tVal)
      };
    });
    const added = addedKeys.map(key => ({
      key,
      change: "add",
      value: change("add", to[key])
    }));
    const removed = removedKeys.map(key => ({
      key,
      change: "remove",
      value: change("remove", from[key])
    }));

    return [...same, ...added, ...removed].reduce(
      (acc, obj) => ({ ...acc, [obj.key]: obj }),
      {}
    );
  }

  if (isObject(from)) {
    return change("remove", from);
  }

  if (isObject(to)) {
    return change("add", to);
  }

  return change("modify", from);
}

function Tree({ tree }) {
  if (!isObject(tree)) {
    return null;
  }

  return sortBy(Object.keys(tree)).map(key => {
    const { change, value } = tree[key];
    return (
      <div className={`tree ${change}`} key={key}>
        <h4>{key}</h4>
        <Tree tree={value} />
      </div>
    );
  });
}

class Home extends Component {
  state = {};
  componentDidMount() {
    console.log("Did mount");
    this.interval = setInterval(this.fetch, 1000);
  }
  fetch = () => {
    fetch("/api")
      .then(x => x.json())
      .then(data =>
        this.setState(({ data: oldData }) => {
          if (isEqual(oldData, data)) {
            return null;
          }

          const diff = diffObject(oldData, data);

          return { data, err: undefined, diff };
        })
      )
      .catch(err => this.setState({ err }));
  };
  componentWillUnmount() {
    clearInterval(this.interval);
    console.log("Did unmount");
  }
  render() {
    return (
      <div className="Home">
        {this.state.err && (
          <div>
            <h1>Error</h1>
            <div>{this.state.err}</div>
          </div>
        )}
        <Tree tree={this.state.diff} />
      </div>
    );
  }
}

export default Home;
