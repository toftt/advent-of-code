interface Hashable {
  hashValues(): Iterable<any>;
}

interface Eq<T> {
  eq(other: T): boolean;
}

export class Point2D implements Hashable, Eq<Point2D> {
  constructor(
    public readonly x: number,
    public readonly y: number,
  ) {}

  *hashValues(): Iterable<any> {
    yield this.x;
    yield this.y;
  }

  eq(other: Point2D): boolean {
    return this.x === other.x && this.y === other.y;
  }
}
