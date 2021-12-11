import { lineify, parseInts } from ".";

interface Bound {
  min: number;
  max: number;
}

export interface Position {
  x: number;
  y: number;
}

export class SparseGrid<T> {
  private readonly map: Map<string, T> = new Map();
  public readonly bounds: { x: Bound; y: Bound } = {
    x: { min: 0, max: 0 },
    y: { min: 0, max: 0 },
  };

  public static positionToString(position: Position) {
    return `${position.x}.${position.y}`;
  }

  public static stringToPosition(positionString: string): Position {
    const [x, y] = parseInts(positionString.split("."));
    return { x, y };
  }

  public adjecent(
    position: Position,
    {
      includeDiagonals = true,
      bounded = true,
    }: { includeDiagonals?: boolean; bounded?: boolean } = {}
  ): Position[] {
    const { x, y } = position;
    const adjecentPositions = [
      { x: x + 1, y },
      { x: x - 1, y },
      { x, y: y + 1 },
      { x, y: y - 1 },
    ];

    if (includeDiagonals) {
      adjecentPositions.push(
        ...[
          {
            x: x - 1,
            y: y - 1,
          },
          {
            x: x + 1,
            y: y - 1,
          },
          {
            x: x - 1,
            y: y + 1,
          },
          {
            x: x + 1,
            y: y + 1,
          },
        ]
      );
    }

    if (bounded) {
      return adjecentPositions.filter(
        (pos) =>
          pos.x >= this.bounds.x.min &&
          pos.x <= this.bounds.x.max &&
          pos.y >= this.bounds.y.min &&
          pos.y <= this.bounds.y.max
      );
    }

    return adjecentPositions;
  }

  public static fromArray<T>(elements: T[][]) {
    const grid = new this<T>();

    for (let i = 0; i < elements.length; i++) {
      for (let j = 0; j < elements[i].length; j++) {
        grid.set({ x: i, y: j }, elements[i][j]);
      }
    }

    return grid;
  }

  public static fromString(gridString: string) {
    const elements = lineify(gridString).map((line) =>
      parseInts(line.split(""))
    );
    const grid = new this<number>();

    for (let i = 0; i < elements.length; i++) {
      for (let j = 0; j < elements[i].length; j++) {
        grid.set({ x: i, y: j }, elements[i][j]);
      }
    }

    return grid;
  }

  get(position: Position) {
    return this.map.get(SparseGrid.positionToString(position));
  }

  set(position: Position, value: T) {
    if (position.x > this.bounds.x.max) this.bounds.x.max = position.x;
    if (position.x < this.bounds.x.min) this.bounds.x.min = position.x;
    if (position.y > this.bounds.y.max) this.bounds.y.max = position.y;
    if (position.y < this.bounds.y.min) this.bounds.y.min = position.y;

    this.map.set(SparseGrid.positionToString(position), value);
  }

  has(position: Position) {
    return this.map.has(SparseGrid.positionToString(position));
  }

  keys() {
    return [...this.map.keys()].map(SparseGrid.stringToPosition);
  }

  values() {
    return [...this.map.values()];
  }

  entries() {
    return [...this.map.entries()].map(
      ([k, v]) => <const>[SparseGrid.stringToPosition(k), v]
    );
  }

  updateAll(updateFn: (item: T) => T) {
    this.entries().forEach(([k, v]) => {
      this.set(k, updateFn(v));
    });
  }
}
