import { part1, part2, partition } from "./solution";

describe("2021 - day 22", () => {
  it("partitions", () => {
    expect(partition(0, 0, 0, 0)).toEqual([{ max: 0, min: 0, part: "both" }]);
    expect(partition(0, 3, 0, 2)).toEqual(0);
  });
  it("solves part 1", () => {
    expect(part1()).toEqual(0);
  });

  it("solves part 2", () => {
    expect(part2()).toEqual(0);
  });
});
