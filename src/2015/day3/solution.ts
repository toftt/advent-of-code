import { readInput } from "~utils/file";
import { GridActor, InfiniteGrid } from "~utils/Grid";

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);

  const grid = new InfiniteGrid();
  const santa = new GridActor(grid, { x: 0, y: 0 });

  grid.addVisit({ x: 0, y: 0 });

  for (const direction of input.split("")) {
    switch (direction) {
      case "<": {
        santa.walk("left");
        break;
      }
      case ">": {
        santa.walk("right");
        break;
      }
      case "^": {
        santa.walk("up");
        break;
      }
      case "v": {
        santa.walk("down");
        break;
      }
      default: {
        throw new Error(`invalid char ${direction}`);
      }
    }
  }

  return [...grid.entries()].length;
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);

  const grid = new InfiniteGrid();
  const santa = new GridActor(grid, { x: 0, y: 0 });
  const roboSanta = new GridActor(grid, { x: 0, y: 0 });

  grid.addVisit({ x: 0, y: 0 });

  let currentActor = santa;
  for (const direction of input.split("")) {
    switch (direction) {
      case "<": {
        currentActor.walk("left");
        break;
      }
      case ">": {
        currentActor.walk("right");
        break;
      }
      case "^": {
        currentActor.walk("up");
        break;
      }
      case "v": {
        currentActor.walk("down");
        break;
      }
      default: {
        throw new Error(`invalid char ${direction}`);
      }
    }
    currentActor = currentActor === santa ? roboSanta : santa;
  }

  return [...grid.entries()].length;
};
