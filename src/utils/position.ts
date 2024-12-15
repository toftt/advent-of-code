export enum Direction {
  W = "W",
  E = "E",
  S = "S",
  N = "N",
  SW = "SW",
  SE = "SE",
  NW = "NW",
  NE = "NE",
}

export const CARDINAL_DIRECTIONS: Direction[] = [
  Direction.N,
  Direction.E,
  Direction.S,
  Direction.W,
];

export const DIAGONAL_DIRECTIONS: Direction[] = [
  Direction.NE,
  Direction.SE,
  Direction.SW,
  Direction.NW,
];

export const ALL_DIRECTIONS: Direction[] = [
  ...CARDINAL_DIRECTIONS,
  ...DIAGONAL_DIRECTIONS,
];

export interface Position {
  x: number;
  y: number;
}

export const DirectionOffsets: {
  [key in Direction]: { x: number; y: number };
} = {
  [Direction.W]: { x: -1, y: 0 },
  [Direction.E]: { x: 1, y: 0 },
  [Direction.S]: { x: 0, y: 1 },
  [Direction.N]: { x: 0, y: -1 },
  [Direction.SW]: { x: -1, y: 1 },
  [Direction.SE]: { x: 1, y: 1 },
  [Direction.NW]: { x: -1, y: -1 },
  [Direction.NE]: { x: 1, y: -1 },
};

/**
 * Return a new position by moving in the specified `direction` by `distance` amount (default 1).
 */
export function move(
  position: Position,
  direction: Direction,
  distance: number = 1,
): Position {
  const offset = DirectionOffsets[direction];
  return {
    x: position.x + offset.x * distance,
    y: position.y + offset.y * distance,
  };
}

export function move2(position: Position, direction: Position): Position {
  return {
    x: position.x + direction.x,
    y: position.y + direction.y,
  };
}

export function manhattanDistance(a: Position, b: Position) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

interface Bound {
  min: number;
  max: number;
}

interface Bounds {
  x: Bound;
  y: Bound;
}

export function getBoundsFromPositions(positions: Position[]): Bounds {
  const bounds = {
    x: {
      min: Infinity,
      max: -Infinity,
    },
    y: {
      min: Infinity,
      max: -Infinity,
    },
  };

  positions.forEach((position) => {
    if (position.x > bounds.x.max) bounds.x.max = position.x;
    if (position.x < bounds.x.min) bounds.x.min = position.x;
    if (position.y > bounds.y.max) bounds.y.max = position.y;
    if (position.y < bounds.y.min) bounds.y.min = position.y;
  });

  return bounds;
}

export function* allPositionsFromBounds(bounds: Bounds) {
  for (let i = bounds.x.min; i <= bounds.x.max; i++) {
    for (let j = bounds.y.min; j <= bounds.y.max; j++) {
      yield { x: i, y: j };
    }
  }
}
