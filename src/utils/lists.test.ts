import { zip } from ".";

describe("zip", () => {
  it("zips", () => {
    const result = zip([1, 2, 3], [4, 5, 6]);
    expect(result).toEqual([
      [1, 4],
      [2, 5],
      [3, 6],
    ]);
  });

  it("zips more", () => {
    const result = zip([1, 2], [3, 4], [5, 6]);
    expect(result).toEqual([
      [1, 3, 5],
      [2, 4, 6],
    ]);
  });
});
