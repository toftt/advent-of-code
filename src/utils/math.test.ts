import { combinations } from ".";

describe("combine", () => {
  it("combines", () => {
    expect(combinations([1, 2, 3], 1)).toEqual([[1], [2], [3]]);

    const result = combinations([1, 2, 3], 2);
    expect(result).toEqual(
      expect.arrayContaining([
        [1, 2],
        [1, 3],
        [2, 3],
      ])
    );
  });

  it("edge case", () => {
    expect(combinations([1, 2], 2)).toEqual([[1, 2]]);
    expect(combinations([1, 2, 3], 3)).toEqual([[1, 2, 3]]);
  });
});
