import { intify, lineify, objectify, readInput } from "~utils";

const input = readInput();
const lines = lineify(input);

type Action = "on" | "off" | "toggle";

const isWithin = (
  tx: number,
  ty: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => {
  return (
    tx >= Math.min(x1, x2) &&
    tx <= Math.max(x1, x2) &&
    ty >= Math.min(y1, y2) &&
    ty <= Math.max(y1, y2)
  );
};

export const part1 = (): number => {
  const actions = lines.map(intify).map(objectify(["x1", "y1", "x2", "y2"]));

  let count = 0;
  for (let i = 0; i < 1_000; i++) {
    for (let j = 0; j < 1_000; j++) {
      let on = false;

      for (let actionIdx in actions) {
        const coords = actions[actionIdx];
        const aString = lines[actionIdx];

        if (isWithin(i, j, coords.x1, coords.y1, coords.x2, coords.y2)) {
          if (/turn on/.test(aString)) {
            on = true;
          } else if (/turn off/.test(aString)) on = false;
          else on = !on;
        }
      }

      if (on) count++;
    }
  }

  return count;
};

export const part2 = (): number => {
  const actions = lines.map(intify).map(objectify(["x1", "y1", "x2", "y2"]));

  let totalBrightness = 0;
  for (let i = 0; i < 1_000; i++) {
    for (let j = 0; j < 1_000; j++) {
      let brightness = 0;

      for (let actionIdx in actions) {
        const coords = actions[actionIdx];
        const aString = lines[actionIdx];

        if (isWithin(i, j, coords.x1, coords.y1, coords.x2, coords.y2)) {
          if (/turn on/.test(aString)) {
            brightness += 1;
          } else if (/turn off/.test(aString))
            brightness = Math.max(brightness - 1, 0);
          else brightness += 2;
        }
      }

      totalBrightness += brightness;
    }
  }

  return totalBrightness;
};
