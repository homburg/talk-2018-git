import React, { useEffect, useReducer, useMemo } from "react";
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
        <h4>
          {key}
          {isObject(value) && (
            <span style={{ opacity: 0.6, marginLeft: "3px" }}>/</span>
          )}
        </h4>
        <Tree tree={value} />
      </div>
    );
  });
}

function useInterval(callback, intervalMilliseconds) {
  useEffect(() => {
    const timer = setInterval(callback, intervalMilliseconds);
    return () => {
      clearInterval(timer);
    };
  }, []);
}

const initialHomeState = {};

function homeDataReducer(state, action) {
  switch (action.type) {
    case "error":
      return { ...state, error: action.payload };
    case "fetched":
      if (isEqual(state.data, action.data)) {
        return state;
      }
      return { data: action.data, oldData: state.data };
    default:
      throw new Error("Unknown action: " + action.type);
  }
}

function Home() {
  const [state, dispatch] = useReducer(homeDataReducer, initialHomeState);

  useInterval(() => {
    fetch("/api")
      .then(x => x.json())
      .then(data => dispatch({ type: "fetched", data }))
      .catch(error => dispatch({ type: "error", error }));
  }, 1000);

  const { data, oldData } = state;
  const diff = useMemo(() => diffObject(oldData, data), [data, oldData]);

  return (
    <div className="home">
      <div className="root">
        {state.error && (
          <div>
            <h1>Error</h1>
            <div>{state.error}</div>
          </div>
        )}
        <Tree tree={diff} />
      </div>
    </div>
  );
}

export default Home;
