import { intify } from "./parse";

describe("intify", () => {
  it("works", () => {
    expect(intify("sdjfie2342x55x129ksdfksdf")).toEqual([2342, 55, 129]);
  });
});
