const isWithin = (n: number, min: number, max: number) => {
  return n >= min && n <= max;
};

class Point {
  constructor(public readonly x: number, public readonly y: number) {}
}

class Rectangle {
  private topLeft: Point;
  private topRight: Point;
  private bottomLeft: Point;
  private bottomRight: Point;

  private xMin: number;
  private xMax: number;
  private yMin: number;
  private yMax: number;

  constructor(x1: number, y1: number, x2: number, y2: number);
  constructor(p1: Point, p2: Point);
  constructor(a: number | Point, b: number | Point, c?: any, d?: any) {
    const [p1, p2] =
      typeof a === "number" && typeof b === "number"
        ? [new Point(a, b), new Point(c, d)]
        : ([a, b] as [Point, Point]);

    if (p1.y === p2.y && p1.x === p2.x) throw new Error("Invalid rectangle.");

    this.xMin = Math.min(p1.x, p2.x);
    this.yMin = Math.min(p1.y, p2.y);
    this.xMax = Math.max(p1.x, p2.x);
    this.yMax = Math.max(p1.y, p2.y);

    this.topLeft = new Point(Math.min(p1.x, p2.x), Math.min(p1.y, p2.y));
    this.topRight = new Point(Math.max(p1.x, p2.x), Math.min(p1.y, p2.y));
    this.bottomLeft = new Point(Math.min(p1.x, p2.x), Math.max(p1.y, p2.y));
    this.bottomRight = new Point(Math.min(p1.x, p2.x), Math.min(p1.y, p2.y));
  }

  private pointIsWithin(p: Point) {
    return (
      isWithin(p.x, this.xMin, this.xMax) && isWithin(p.y, this.yMin, this.yMax)
    );
  }

  public shrink(r: Rectangle) {
    // there's space to expand all the way to the right
    if (this.yMin < r.yMin) {
      const cutout = new Rectangle(
        this.topLeft,
        new Point(this.xMax, r.yMin - 1)
      );
      const rest = new Rectangle(
        this.xMin,
        r.yMin,
        this.bottomRight.x,
        this.bottomRight.y
      );
    }
  }

  intersection(r: Rectangle): {
    intersections: Rectangle[];
    originals: Rectangle[];
  } {
    const topLeftInside = this.pointIsWithin(r.topLeft);
    const topRightInside = this.pointIsWithin(r.topRight);
    const bottomLeftInside = this.pointIsWithin(r.bottomLeft);
    const bottomRightInside = this.pointIsWithin(r.bottomRight);

    // rectangle r is completely within this rectangle
    if (
      [
        topLeftInside,
        topRightInside,
        bottomLeftInside,
        bottomRightInside,
      ].every((b) => b)
    ) {
      const intersection = new Rectangle(r.topLeft, r.bottomRight);
    }

    return { intersections: [], originals: [] };
  }
}
