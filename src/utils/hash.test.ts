import { HashSet, WithEq, WithHashValues } from "./hash";

class Point implements WithHashValues, WithEq {
  constructor(
    public readonly x: number,
    public readonly y: number,
  ) {}

  eq(other: any): boolean {
    return other instanceof Point && this.x === other.x && this.y === other.y;
  }

  *hashValues(): Iterable<any> {
    yield this.x;
    yield this.y;
  }
}

describe("HashSet", () => {
  it("allows adding and checking membership", () => {
    const s = new HashSet();

    const a = new Point(1, 3);
    const b1 = new Point(2, 4);
    const b2 = new Point(2, 4);

    expect(s.has(a)).toEqual(false);
    expect(s.has(b1)).toEqual(false);
    expect(s.has(b2)).toEqual(false);

    s.add(a);

    expect(s.has(a)).toEqual(true);
    expect(s.size).toEqual(1);

    s.add(a);
    expect(s.size).toEqual(1);

    s.add(b1);
    s.add(b2);

    expect(s.has(b1)).toEqual(true);
    expect(s.has(b2)).toEqual(true);

    expect(s.size).toEqual(2);

    expect(s.delete(b1)).toEqual(true);
    expect(s.delete(b2)).toEqual(false);
    expect(s.size).toEqual(1);
  });
});
