import { Counter } from "./Counter";

describe("Counter", () => {
  it("works", () => {
    const counter = new Counter([1, 1, 3, 5, 5, 5, 7]);

    expect([...counter.entries()]).toEqual(
      expect.arrayContaining([
        [1, 2],
        [3, 1],
        [5, 3],
        [7, 1],
      ])
    );
  });
});
