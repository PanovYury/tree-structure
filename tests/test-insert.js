import assert from "node:assert";
import { describe, it } from "node:test";

import { Tree } from "../src/tree.js";

describe("insert elements", async () => {
  const source = { id: 1, title: "1" };

  await it("insert into root", () => {
    const tree = Tree.parse(source);
    const child = new Tree(2, "2");

    assert.strictEqual(tree.children.length, 0);

    tree.insert(child);
    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0], child);
  });

  await it("insert into child", () => {
    const tree = Tree.parse(source);
    const child1 = new Tree(2, "2");
    const child2 = new Tree(3, "3");

    tree.insert(child1);
    child1.insert(child2);

    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0], child1);

    assert.strictEqual(child1.children.length, 1);
    assert.strictEqual(child1.children[0], child2);

    assert.strictEqual(child2.children.length, 0);
  });

  await it("insert to position", async () => {
    const tree = Tree.parse(source);
    const child1 = new Tree(2, "2");
    const child2 = new Tree(3, "3");
    const child3 = new Tree(4, "4");
    const child4 = new Tree(5, "5");

    tree.insert(child1);
    tree.insert(child2);

    await it("insert to end", () => {
      assert.strictEqual(tree.children.length, 2);
      assert.deepEqual(tree.children, [child1, child2]);
    });

    await it("insert to center", () => {
      tree.insert(child3, 1);
      assert.strictEqual(tree.children.length, 3);
      assert.deepEqual(tree.children, [child1, child3, child2]);
    });

    await it("insert to start", () => {
      tree.insert(child4, 0);
      assert.strictEqual(tree.children.length, 4);
      assert.deepEqual(tree.children, [child4, child1, child3, child2]);
    });
  });
});
