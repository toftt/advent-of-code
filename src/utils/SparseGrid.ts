import {
  ALL_DIRECTIONS,
  CARDINAL_DIRECTIONS,
  Direction,
  lineify,
  move,
  parseInts,
  Position,
} from ".";

interface Bound {
  min: number;
  max: number;
}

export class StringifiedSet<T> {
  private readonly set: Set<string>;

  constructor() {
    this.set = new Set();
  }

  clone() {
    const newSet = new StringifiedSet<T>();

    for (const val of this.set.keys()) {
      newSet.set.add(val);
    }

    return newSet;
  }

  add(value: T) {
    this.set.add(JSON.stringify(value));
    return this;
  }

  clear() {
    this.set.clear();
  }

  delete(value: T) {
    return this.set.delete(JSON.stringify(value));
  }

  has(value: T) {
    return this.set.has(JSON.stringify(value));
  }

  keys(): T[] {
    return [...this.set.keys()].map((k) => JSON.parse(k));
  }

  get size() {
    return this.set.size;
  }
}

export class SparseGrid<T> {
  private map: Map<string, T> = new Map();
  public bounds: { x: Bound; y: Bound } = {
    x: { min: Infinity, max: -Infinity },
    y: { min: Infinity, max: -Infinity },
  };

  public static positionToString(position: Position) {
    return `${position.x}.${position.y}`;
  }

  public static stringToPosition(positionString: string): Position {
    const [x, y] = parseInts(positionString.split("."));
    return { x, y };
  }

  public shallowCopy() {
    const m = new SparseGrid<T>();
    m.map = new Map(this.map);
    m.bounds = this.bounds;
    return m;
  }

  public adjecent(
    position: Position,
    {
      includeDiagonals = false,
      bounded = true,
    }: {
      /** Whether to include diagonal neighbors. */
      includeDiagonals?: boolean;
      /** If true, will not return positions that are outside the current "bounds" of the grid. */
      bounded?: boolean;
    } = {},
  ): Position[] {
    const adjecentPositions = (
      includeDiagonals ? ALL_DIRECTIONS : CARDINAL_DIRECTIONS
    ).map((dir) => move(position, dir));

    if (bounded) {
      return adjecentPositions.filter(this.isWithinBounds.bind(this));
    }

    return adjecentPositions;
  }

  public traverseDirection(
    position: Position,
    direction: Direction,
    {
      maxDistance = Infinity,
      continueOverGaps = false,
      untilCondition = (pos: Position) => <boolean>false,
    } = {},
  ): { position: Position; value: T }[] {
    const values = [];
    let currentPosition = position;
    let steps = 0;

    while (
      (this.has(currentPosition) ||
        (continueOverGaps && this.isWithinBounds(currentPosition))) &&
      (maxDistance === undefined || steps < maxDistance) &&
      !untilCondition(currentPosition)
    ) {
      if (this.has(currentPosition)) {
        values.push({
          position: currentPosition,
          value: this.get(currentPosition)!,
        });
      }

      currentPosition = move(currentPosition, direction);
      steps++;
    }

    return values;
  }

  public isWithinBounds(pos: Position): boolean {
    return (
      pos.x >= this.bounds.x.min &&
      pos.x <= this.bounds.x.max &&
      pos.y >= this.bounds.y.min &&
      pos.y <= this.bounds.y.max
    );
  }

  public static fromArray<T>(elements: T[][]) {
    const grid = new this<T>();

    for (let i = 0; i < elements.length; i++) {
      for (let j = 0; j < elements[i].length; j++) {
        grid.set({ x: j, y: i }, elements[i][j]);
      }
    }

    return grid;
  }

  public static fromPositionArray(positions: Position[]) {
    const grid = new this<null>();

    for (const position of positions) {
      grid.set(position, null);
    }
    return grid;
  }

  public static fromString(gridString: string) {
    const elements = lineify(gridString).map((line) =>
      parseInts(line.split("")),
    );
    const grid = new this<number>();

    for (let i = 0; i < elements.length; i++) {
      for (let j = 0; j < elements[i].length; j++) {
        grid.set({ x: j, y: i }, elements[i][j]);
      }
    }

    return grid;
  }

  public static fromString2(gridString: string) {
    const elements = lineify(gridString).map((line) => line.split(""));
    const grid = new this<string>();

    for (let i = 0; i < elements.length; i++) {
      for (let j = 0; j < elements[i].length; j++) {
        grid.set({ x: j, y: i }, elements[i][j]);
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

  delete(position: Position) {
    return this.map.delete(SparseGrid.positionToString(position));
  }

  keys() {
    return [...this.map.keys()].map(SparseGrid.stringToPosition);
  }

  values() {
    return [...this.map.values()];
  }

  entries() {
    return [...this.map.entries()].map(
      ([k, v]) => <const>[SparseGrid.stringToPosition(k), v],
    );
  }

  updateAll(updateFn: (item: T) => T) {
    this.entries().forEach(([k, v]) => {
      this.set(k, updateFn(v));
    });
  }

  recalculateBounds() {
    this.bounds.x.min = Infinity;
    this.bounds.y.min = Infinity;
    this.bounds.x.max = -Infinity;
    this.bounds.y.max = -Infinity;

    this.keys().forEach((position) => {
      if (position.x > this.bounds.x.max) this.bounds.x.max = position.x;
      if (position.x < this.bounds.x.min) this.bounds.x.min = position.x;
      if (position.y > this.bounds.y.max) this.bounds.y.max = position.y;
      if (position.y < this.bounds.y.min) this.bounds.y.min = position.y;
    });
  }

  toString(): string {
    this.recalculateBounds();

    const rows: string[] = [];
    for (let y = this.bounds.y.min; y <= this.bounds.y.max; y++) {
      const row: string[] = [];

      for (let x = this.bounds.x.min; x <= this.bounds.x.max; x++) {
        const value = this.get({ y, x });

        row.push(value !== undefined ? `${value}` : ".");
      }
      rows.push(row.join(""));
    }

    return rows.join("\n");
  }

  print(): void {
    console.log(this.toString());
  }
}
