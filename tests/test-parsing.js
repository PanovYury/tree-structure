import assert from "node:assert";
import { describe, it } from "node:test";

import { Tree } from "../src/tree.js";
import { testJson } from "./data.js";

describe("parsing json", async () => {
  const current = new Tree(null, null, [
    new Tree(1, "a"),
    new Tree(2, "b", [new Tree(3, "c")]),
  ]);

  await it("parsing string", () => {
    const treeStr = Tree.parse(testJson);
    assert.deepEqual(current, treeStr);
  });

  await it("parsing object", () => {
    const objectJson = JSON.parse(testJson);
    const treeObj = Tree.parse(objectJson);
    assert.deepEqual(current, treeObj);
  });
});
