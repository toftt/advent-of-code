import { allCombinations, combinations, oneFromEach } from ".";

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

describe("allCombinations", () => {
  it("combines", () => {
    const result = allCombinations([1, 2, 3], 2);
    expect(result).toEqual(
      expect.arrayContaining([[1, 2], [1, 3], [2, 3], [1], [2], [3], []])
    );
  });
});

describe("oneFromEach", () => {
  it("take on of each 1", () => {
    const result = oneFromEach([1, 2], [3, 4]);
    expect(result).toEqual(
      expect.arrayContaining([
        [1, 3],
        [1, 4],
        [2, 3],
        [2, 4],
      ])
    );
  });

  it("take on of each 2", () => {
    const result = oneFromEach([1, 2], [3, 4], [5, 6]);
    expect(result).toEqual(
      expect.arrayContaining([
        [1, 3, 5],
        [1, 3, 6],
        [1, 4, 5],
        [1, 4, 6],
        [2, 3, 5],
        [2, 3, 6],
        [2, 4, 5],
        [2, 4, 6],
      ])
    );
  });
});
