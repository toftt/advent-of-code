import {
  ALL_DIRECTIONS,
  DIAGONAL_DIRECTIONS,
  readInput,
  SparseGrid,
} from "~utils";

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const grid = SparseGrid.fromString2(input);

  let found = 0;

  for (const pos of grid.keys()) {
    for (const direction of ALL_DIRECTIONS) {
      let leg = grid
        .traverseDirection(pos, direction, { maxDistance: 4 })
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
      const leg = grid.traverseDirection(pos, direction, { maxDistance: 3 });
      const value = leg.map((x) => x.value).join("");

      if (value === "MAS") {
        const middlePosition = SparseGrid.positionToString(leg[1].position);
        found.set(middlePosition, (found.get(middlePosition) || 0) + 1);
      }
    }
  }

  return [...found.values()].filter((x) => x > 1).length;
};
