import { Tree } from "./tree.js";

const tree = Tree.fromArray([
  {
    id: 1,
    title: "Tatooine",
    children: [
      { id: 2, title: "Endor", children: [] },
      { id: 3, title: "Hoth", children: [] },
      { id: 4, title: "Dagobah", children: [] },
    ],
  },
  {
    id: 5,
    title: "Death Star",
    children: [],
  },
  {
    id: 6,
    title: "Alderaan",
    children: [
      {
        id: 7,
        title: "Bespin",
        children: [{ id: 8, title: "Jakku", children: [] }],
      },
    ],
  },
]);

console.log(tree.toString());

tree.title
