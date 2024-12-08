import { groupBy, zipMany } from ".";

describe("zip", () => {
  it("zips", () => {
    const result = zipMany([1, 2, 3], [4, 5, 6]);
    expect(result).toEqual([
      [1, 4],
      [2, 5],
      [3, 6],
    ]);
  });

  it("zips more", () => {
    const result = zipMany([1, 2], [3, 4], [5, 6]);
    expect(result).toEqual([
      [1, 3, 5],
      [2, 4, 6],
    ]);
  });
});

describe("groupBy", () => {
  it("groups by", () => {
    const elements = [
      { name: "a", value: "a" },
      { name: "a", value: "b" },
      { name: "b", value: "a" },
      { name: "b", value: "b" },
      { name: "c", value: "c" },
    ];

    const result = groupBy(elements, (x) => x.name);
    expect(result).toEqual({
      a: [elements[0], elements[1]],
      b: [elements[2], elements[3]],
      c: [elements[4]],
    });
  });
});
