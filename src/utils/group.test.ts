import { group } from ".";

describe("group", () => {
  it("groups", () => {
    const result = group([4, 5, 6, 6, 2, 3, 5, 89], 2);

    expect(result).toEqual([
      [4, 5],
      [6, 6],
      [2, 3],
      [5, 89],
    ]);
  });

  it("throws error if size is unequal", () => {
    expect(() => group([4, 5, 6], 2)).toThrow();
  });

  it("allows unequal group if option set", () => {
    const result = group([4, 5, 6], 2, true);

    expect(result).toEqual([[4, 5], [6]]);
  });
});
