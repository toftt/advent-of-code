import { windows } from "./windows";

describe("windows", () => {
  it("length less than sliding window returns empty", () => {
    expect(windows([1, 2], 3)).toEqual([]);
    expect(windows([], 1)).toEqual([]);
  });

  it("length same as sliding element", () => {
    expect(windows([1, 2], 2)).toEqual([[1, 2]]);
  });

  it("size less than length", () => {
    expect(windows([1, 2, 3, 4], 2)).toEqual([
      [1, 2],
      [2, 3],
      [3, 4],
    ]);
  });
});
