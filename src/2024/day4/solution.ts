import {
  ALL_DIRECTIONS,
  DIAGONAL_DIRECTIONS,
  enumerate,
  lineify,
  Position,
  readInput,
  SparseGrid,
} from "~utils";

const directions = [
  ({ x, y }: Position) => ({ x: x + 1, y }),
  ({ x, y }: Position) => ({ x: x - 1, y }),
  ({ x, y }: Position) => ({ x, y: y + 1 }),
  ({ x, y }: Position) => ({ x, y: y - 1 }),
  ({ x, y }: Position) => ({
    x: x - 1,
    y: y - 1,
  }),
  ({ x, y }: Position) => ({
    x: x + 1,
    y: y - 1,
  }),
  ({ x, y }: Position) => ({
    x: x - 1,
    y: y + 1,
  }),
  ({ x, y }: Position) => ({
    x: x + 1,
    y: y + 1,
  }),
];

const directions2 = [
  ({ x, y }: Position) => ({
    x: x - 1,
    y: y - 1,
  }),
  ({ x, y }: Position) => ({
    x: x + 1,
    y: y - 1,
  }),
  ({ x, y }: Position) => ({
    x: x - 1,
    y: y + 1,
  }),
  ({ x, y }: Position) => ({
    x: x + 1,
    y: y + 1,
  }),
];

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const grid = SparseGrid.fromString2(input);

  let found = 0;

  for (const pos of grid.keys()) {
    for (const direction of ALL_DIRECTIONS) {
      let leg = grid
        .traverseDirection(pos, direction, 4)
        .map((x) => x.value)
        .join("");
      if (leg === "XMAS") found += 1;
    }
  }

  return found;
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);

  const grid = SparseGrid.fromString2(input);

  const found = new Map();

  for (const pos of grid.keys()) {
    for (const direction of DIAGONAL_DIRECTIONS) {
      const leg = grid.traverseDirection(pos, direction, 3);
      const value = leg.map((x) => x.value).join("");

      if (value === "MAS") {
        const middlePosition = SparseGrid.positionToString(leg[1].position);
        found.set(middlePosition, (found.get(middlePosition) || 0) + 1);
      }
    }
  }

  return [...found.values()].filter((x) => x > 1).length;
};
