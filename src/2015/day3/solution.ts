import { readInput } from "~utils/file";
import { GridActor, InfiniteGrid } from "~utils/Grid";

const input = readInput();

export const part1 = () => {
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

export const part2 = () => {
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

const ans1 = part1();
const ans2 = part2();

console.log({ ans1, ans2 });
