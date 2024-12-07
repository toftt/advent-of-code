import {
  Direction,
  move,
  Position,
  readInput,
  SparseGrid,
  StringifiedSet,
} from "~utils";

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const grid = SparseGrid.fromString2(input);

  let current = grid.entries().find(([p, s]) => s === "^")![0];
  let dir: Direction = <Direction>Direction.N;

  console.log({ current, dir });

  while (grid.isWithinBounds(current)) {
    grid.set(current, "X");
    const next = move(current, dir);

    if (grid.get(next) === "#") {
      switch (dir) {
        case Direction.N: {
          dir = Direction.E;
          break;
        }
        case Direction.E: {
          dir = Direction.S;
          break;
        }
        case Direction.S: {
          dir = Direction.W;
          break;
        }
        case Direction.W: {
          dir = Direction.N;
          break;
        }
      }
    }
    current = move(current, dir);
  }

  const result = grid.values().filter((x) => x === "X");
  return result.length;
};

const isLoop = (grid: SparseGrid<string>) => {
  let current = grid.entries().find(([p, s]) => s === "^")![0];
  let dir: Direction = <Direction>Direction.N;

  let seen = new StringifiedSet<{ dir: Direction; pos: Position }>();
  while (grid.isWithinBounds(current)) {
    if (seen.has({ pos: current, dir })) {
      return true;
    }

    seen.add({ pos: current, dir });

    const next = move(current, dir);

    if (grid.get(next) === "#") {
      while (grid.get(move(current, dir)) === "#") {
        switch (dir) {
          case Direction.N: {
            dir = Direction.E;
            break;
          }
          case Direction.E: {
            dir = Direction.S;
            break;
          }
          case Direction.S: {
            dir = Direction.W;
            break;
          }
          case Direction.W: {
            dir = Direction.N;
            break;
          }
        }
      }
    }
    current = move(current, dir);
  }

  return false;
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const grid = SparseGrid.fromString2(input);

  let current = grid.entries().find(([p, s]) => s === "^")![0];
  let dir: Direction = <Direction>Direction.N;

  const possibleObstacles = new StringifiedSet<Position>();

  while (grid.isWithinBounds(current)) {
    while (grid.get(move(current, dir)) === "#") {
      switch (dir) {
        case Direction.N: {
          dir = Direction.E;
          break;
        }
        case Direction.E: {
          dir = Direction.S;
          break;
        }
        case Direction.S: {
          dir = Direction.W;
          break;
        }
        case Direction.W: {
          dir = Direction.N;
          break;
        }
      }
    }
    possibleObstacles.add(move(current, dir));
    current = move(current, dir);
  }

  let total = 0;
  let i = 0;
  for (const obstaclePos of possibleObstacles.keys()) {
    i++;
    const newGrid = grid.shallowCopy();
    if (
      !newGrid.isWithinBounds(obstaclePos) ||
      ["^", "#"].includes(newGrid.get(obstaclePos)!)
    ) {
      continue;
    }

    if (i % 100 === 0) {
      console.log(i);
    }

    if (i > 200) {
      break;
    }

    newGrid.set(obstaclePos, "#");
    if (isLoop(newGrid)) {
      // newGrid.set(obstaclePos, "O");
      // newGrid.print();
      // console.log();
      total++;
    }
  }

  return total;
};
