import { InfiniteGrid, intify, lineify, readInput } from "~utils";

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const lines = lineify(input);
  const coords = lines.map(intify);

  const grid = new InfiniteGrid();

  coords
    .filter(([x1, y1, x2, y2]) => x1 === x2 || y1 === y2)
    .forEach(([x1, y1, x2, y2]) => {
      for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
        for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
          grid.addVisit({ x, y });
        }
      }
    });

  return [...grid.entries()].map(([_k, v]) => v).filter((v) => v >= 2).length;
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const lines = lineify(input);
  const coords = lines.map(intify);

  const grid = new InfiniteGrid();

  coords.forEach(([x1, y1, x2, y2]) => {
    if (x1 === x2 || y1 === y2) {
      for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
        for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
          grid.addVisit({ x, y });
        }
      }
    } else {
      for (let i = 0; i <= Math.abs(x1 - x2); i++) {
        const x = x1 + Math.sign(x2 - x1) * i;
        const y = y1 + Math.sign(y2 - y1) * i;

        grid.addVisit({ x, y });
      }
    }
  });

  return [...grid.entries()].map(([k, v]) => v).filter((v) => v >= 2).length;
};
