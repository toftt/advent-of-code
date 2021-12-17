import { readInput } from "~utils";

const fallsInThing = (initialY: number, yMin: number, yMax: number) => {
  const maxHeight = (initialY * (initialY + 1)) / 2;

  let steps = 0;
  while (true) {
    if (maxHeight - (steps * (steps + 1)) / 2 <= yMax) break;
    steps++;
  }

  if (maxHeight - (steps * (steps + 1)) / 2 >= yMin) return maxHeight;
  return undefined;
};

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const [, x1, x2, y1, y2] = input
    .match(/target area: x=(-?\d+)..(-?\d+), y=(-?\d+)..(-?\d+)/)!
    .map((x) => parseInt(x));

  console.log({ x1, x2, y1, y2 });
  const yMin = Math.min(y1, y2);
  const yMax = Math.max(y1, y2);

  for (let i = 0; i < 1_000_000; i++) {
    const m = fallsInThing(i, yMin, yMax);
    if (m) console.log(m);
  }

  // solution here
  return -1;
};

const fallsInThing2 = (
  yVelo: number,
  xVelo: number,
  yMin: number,
  yMax: number,
  xMin: number,
  xMax: number
) => {
  let steps = 0;
  let xPos;
  let yPos;
  while (true) {
    const left = Math.max(xVelo - steps, 0);
    xPos = (xVelo * (xVelo + 1)) / 2 - (left * (left + 1)) / 2;

    const yLeft = yVelo - steps;
    yPos = (yVelo * (yVelo + 1)) / 2 - (yLeft * (yLeft + 1)) / 2;

    if (yPos <= yMax && xPos >= xMin) break;
    steps++;
  }

  if (yPos >= yMin && xPos <= xMax) return true;
  return false;

  // const maxHeight = (initialY * (initialY + 1)) / 2;
  // const maxX = xMax;

  // let steps = 0;
  // while (true) {
  //   if (maxHeight - (steps * (steps + 1)) / 2 <= yMax) break;
  //   steps++;
  // }

  // if (maxHeight - (steps * (steps + 1)) / 2 >= yMin) return maxHeight;
  // return undefined;
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const [, x1, x2, y1, y2] = input
    .match(/target area: x=(-?\d+)..(-?\d+), y=(-?\d+)..(-?\d+)/)!
    .map((x) => parseInt(x));

  console.log({ x1, x2, y1, y2 });
  const yMin = Math.min(y1, y2);
  const yMax = Math.max(y1, y2);
  const xMin = Math.min(x1, x2);
  const xMax = Math.max(x1, x2);

  let count = 0;
  for (let y = yMin; y < 10_000; y++) {
    for (let x = 15; x <= xMax; x++) {
      const works = fallsInThing2(y, x, yMin, yMax, xMin, xMax);
      if (works) {
        count++;
      }
    }
  }

  console.log(count);

  // solution here
  return -1;
};
