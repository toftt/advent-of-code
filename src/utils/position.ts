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
