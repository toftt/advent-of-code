import { PriorityQueue } from "./PriorityQueue";

describe("PriorityQueue", () => {
  it("works", () => {
    const q = new PriorityQueue([1, 7, 9, 8, 3, 5, 11, 22], (a, b) => a >= b);

    let result = [];
    while (!q.isEmpty()) {
      result.push(q.pop());
    }
    expect(result).toEqual([22, 11, 9, 8, 7, 5, 3, 1]);
  });

  it("works (2)", () => {
    const q = new PriorityQueue([1, 7, 9, 8, 3, 5, 11, 22], (a, b) => a >= b);
    q.increasePriority((x) => x === 7, 13);

    let result = [];
    while (!q.isEmpty()) {
      result.push(q.pop());
    }
    expect(result).toEqual([22, 13, 11, 9, 8, 5, 3, 1]);
  });
});
