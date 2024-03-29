import assert from "node:assert";
import test from "node:test";

import { Tree } from "../src/tree.js";
import { testJson } from "./data.js";

test("find by id", () => {
  const tree = Tree.parse(testJson);
  tree.id = 0;
  for (let i = 0; i <= 3; i++) {
    const node = tree.find(i);
    assert.strictEqual(node.id, i);
  }
});
