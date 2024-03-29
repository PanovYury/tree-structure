import assert from "node:assert";
import { describe, it } from "node:test";

import { Tree } from "../src/tree.js";
import { testJson } from "./data.js";

describe("move elements", async () => {
  const tree = Tree.parse(testJson);

  const node1 = tree.find(1);
  const node2 = tree.find(2);
  const node3 = tree.find(3);

  // Проверка стартовой иерархии
  assert.strictEqual(node1.parent, tree);
  assert.strictEqual(node2.parent, tree);
  assert.strictEqual(node3.parent, node2);

  await it("before", () => {
    tree.move(node3, node1, "before");
    assert.strictEqual(node3.parent, tree);
    assert.deepStrictEqual(tree.children, [node3, node1, node2]);
  });

  await it("after", () => {
    tree.move(node3, node1, "after");
    assert.strictEqual(node3.parent, tree);
    assert.deepStrictEqual(tree.children, [node1, node3, node2]);
  });

  await it("inside", () => {
    tree.move(node3, node1, "inside");
    assert.strictEqual(node3.parent, node1);
    assert.deepStrictEqual(node1.children, [node3]);
    assert.deepStrictEqual(tree.children, [node1, node2]);
  });
});
