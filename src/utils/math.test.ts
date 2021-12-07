import { add, allCombinations, combinations, median, oneFromEach } from ".";

describe("add", () => {
  it("adds (1)", () => {
    const arr = [1, 2, 3, 4];
    expect(arr.reduce(add, 0)).toEqual(10);
  });

  it("adds (2)", () => {
    const arr = [0, 1, 2, 3, 4];
    expect(arr.reduce(add, 0)).toEqual(10);
  });

  it("adds (3)", () => {
    const arr = [0, 1, 2, 3, 4];
    expect(arr.map(add(2))).toEqual([2, 3, 4, 5, 6]);
  });
});

describe("median", () => {
  it("calculates median (odd no of elems)", () => {
    expect(median([1, 2, 3])).toEqual(2);
    expect(median([-30, 3, 30])).toEqual(3);
    expect(median([-1, -30, 3, 30, 4])).toEqual(3);
  });

  it("calculates median (even no of elems)", () => {
    expect(median([1, 2, 3, 4])).toEqual(2.5);
    expect(median([-30, 3, 30, 40])).toEqual(16.5);
    expect(median([-1, 3, 3, 30])).toEqual(3);
  });

  it("calculates median (custom accessor)", () => {
    expect(
      median(
        [
          { a: "a", val: 1 },
          { a: "b", val: 2 },
          { a: "c", val: 3 },
        ],
        (a) => a.val
      )
    ).toEqual(2);

    expect(
      median(
        [
          { a: "a", val: 1 },
          { a: "b", val: 2 },
          { a: "c", val: 3 },
          { a: "d", val: 4 },
        ],
        (a) => a.val
      )
    ).toEqual(2.5);
  });
});

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
