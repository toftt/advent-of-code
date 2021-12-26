import { intify, lineify, oneFromEach, readInput } from "~utils";

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const lines = lineify(input).map((x) => {
    const [action, coords] = x.split(" ");
    return { action: action === "on", coords: intify(coords) };
  });

  console.log(lines);
  let sum = 0;
  for (let x = -50; x <= 50; x++) {
    for (let y = -50; y <= 50; y++) {
      for (let z = -50; z <= 50; z++) {
        let on = false;

        for (const line of lines) {
          const [x1, x2, y1, y2, z1, z2] = line.coords;

          if (
            x >= Math.min(x1, x2) &&
            x <= Math.max(x1, x2) &&
            y >= Math.min(y1, y2) &&
            y <= Math.max(y1, y2) &&
            z >= Math.min(z1, z2) &&
            z <= Math.max(z1, z2)
          ) {
            on = line.action;
          }
        }
        if (on) sum += 1;
      }
    }
  }

  // solution here
  return sum;
};

interface Position3D {
  x: number;
  y: number;
  z: number;
}

interface Cuboid {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  zMin: number;
  zMax: number;
  set: boolean;
}

interface CuboidIn {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  zMin: number;
  zMax: number;
  set: boolean;
  part: "a" | "b" | "both";
}

interface Partition {
  min: number;
  max: number;
  part: "a" | "b" | "both";
}

export const partition = (
  aMin: number,
  aMax: number,
  bMin: number,
  bMax: number
): Array<Partition> => {
  // not overlapping
  if (aMin > bMax || bMin > aMax) {
    return [
      { min: aMin, max: aMax, part: "a" },
      { min: bMin, max: bMax, part: "b" },
    ];
  }

  // a:    |-----|
  // b:  |-----|
  if (bMin < aMin && bMax < aMax) {
    return [
      { min: aMin, max: bMax, part: "both" },
      { min: bMin, max: aMin - 1, part: "b" },
      { min: bMax + 1, max: aMax, part: "a" },
    ];
  }
  // a: |-----|
  // b:    |-----|
  if (aMin < bMin && aMax < bMax) {
    return [
      { min: bMin, max: aMax, part: "both" },
      { min: aMin, max: bMin - 1, part: "a" },
      { min: aMax + 1, max: bMax, part: "b" },
    ];
  }

  // a: |---------|
  // b:   |-----|
  if (bMin >= aMin && bMax <= aMax) {
    const result: Partition[] = [{ min: bMin, max: bMax, part: "both" }];

    if (aMin !== bMin) {
      result.push({ min: aMin, max: bMin - 1, part: "a" });
    }
    if (aMax !== bMax) {
      result.push({ min: bMax + 1, max: aMax, part: "a" });
    }
    return result;
  }

  // a:     |----|
  // b: |-----------|
  if (aMin >= bMin && aMax <= bMax) {
    const result: Partition[] = [{ min: aMin, max: aMax, part: "both" }];
    if (bMin !== aMin) {
      result.push({ min: bMin, max: aMin - 1, part: "b" });
    }
    if (bMax !== aMax) {
      result.push({ min: aMax + 1, max: bMax, part: "b" });
    }
    return result;
  }
  console.log(aMin, aMax, bMin, bMax);
  throw new Error("this should not happen");
  return [];
};

const printCuboidCords = (c: Cuboid) => {
  let count = 1;
  for (let i = c.xMin; i <= c.xMax; i++) {
    for (let j = c.yMin; j <= c.yMax; j++) {
      for (let k = c.zMin; k <= c.zMax; k++) {
        console.log({ x: i, y: j, z: k, set: c.set, count: count++ });
      }
    }
  }
};

const getPartitions = (a: Cuboid, b: Cuboid) => {
  const xPartitions = partition(a.xMin, a.xMax, b.xMin, b.xMax);
  const yPartitions = partition(a.yMin, a.yMax, b.yMin, b.yMax);
  const zPartitions = partition(a.zMin, a.zMax, b.zMin, b.zMax);

  const combinedPartitions = oneFromEach(xPartitions, yPartitions, zPartitions)
    .map((parts) => {
      const ps = parts.map((x) => x.part);
      let resolvedPart: null | Partition["part"] = null;
      if (ps.includes("a") && ps.includes("b")) {
        return { resolvedPart, dimensions: parts };
      } else if (ps.every((x) => x === "both")) {
        return { resolvedPart: "both", dimensions: parts };
      } else if (ps.includes("a")) {
        return { resolvedPart: "a", dimensions: parts };
      } else {
        return { resolvedPart: "b", dimensions: parts };
      }
    })
    .filter((x) => !(x.resolvedPart === null));

  return combinedPartitions.reduce(
    (acc, parts) => {
      const set = parts.resolvedPart === "a" ? a.set : b.set;
      acc[parts.resolvedPart!].push({
        set,
        xMin: parts.dimensions[0].min,
        xMax: parts.dimensions[0].max,
        yMin: parts.dimensions[1].min,
        yMax: parts.dimensions[1].max,
        zMin: parts.dimensions[2].min,
        zMax: parts.dimensions[2].max,
      });
      return acc;
    },
    { a: [], b: [], both: [] } as any
  );
};

const cuboidSize = (c: Cuboid) => {
  return (
    (Math.abs(c.xMax - c.xMin) + 1) *
    (Math.abs(c.yMax - c.yMin) + 1) *
    (Math.abs(c.zMax - c.zMin) + 1)
  );
};

const worldSize = (c: Cuboid[]) => {
  return c.reduce((acc, c) => acc + cuboidSize(c), 0);
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const cuboids: Cuboid[] = lineify(input)
    .map((x) => {
      const [action, coords] = x.split(" ");
      return { action: action === "on", coords: intify(coords) };
    })
    .map(({ action, coords }) => {
      return {
        xMin: Math.min(coords[0], coords[1]),
        xMax: Math.max(coords[0], coords[1]),
        yMin: Math.min(coords[2], coords[3]),
        yMax: Math.max(coords[2], coords[3]),
        zMin: Math.min(coords[4], coords[5]),
        zMax: Math.max(coords[4], coords[5]),
        set: action,
      };
    });

  let current: Cuboid[] = [cuboids[0]];
  console.log({ w: worldSize(current) });

  let count = 0;
  for (const other of cuboids.slice(1)) {
    console.log(count++);
    let remaining: Cuboid[] = [other];

    const candidates = new Set<number>();
    for (let i = 0; i < current.length; i++) {
      const { both } = getPartitions(current[i], other);
      if (both.length !== 0) {
        candidates.add(i);
      }
    }

    let found = true;
    while (found) {
      found = false;
      outer: for (let j = 0; j < remaining.length; j++) {
        const rem = remaining[j];
        // console.log(current.length);

        for (let i = 0; i < current.length; i++) {
          // if (!candidates.has(i)) continue;
          const { a, b, both } = getPartitions(current[i], rem);
          if (both.length !== 0) {
            current.splice(i, 1, ...a, ...both);
            // console.log(
            //   `### turn these coords from ${current[i].set} to ${rem.set}`
            // );
            // for (const a of both) {
            //   printCuboidCords(a);
            // }
            // console.log("###");
            // console.log(`### remaining before`);
            // for (const a of remaining) {
            //   printCuboidCords(a);
            // }
            // console.log("###");
            // console.log("###");
            // console.log(`### remaining now`);
            // for (const a of b) {
            //   printCuboidCords(a);
            // }
            // console.log("###");

            remaining.splice(j, 1, ...b);
            found = true;
            break outer;
          }
        }
      }
    }
    current.push(...remaining);
    // console.log(`### add these remaining as`);
    // for (const a of remaining) {
    //   printCuboidCords(a);
    // }
    // console.log("###");
    current = current.filter((x) => x.set);

    // console.log({ w: worldSize(current) });
    // for (const a of current) {
    //   printCuboidCords(a);
    // }
  }
  let sum = 0;
  for (const cube of current.filter((x) => x.set)) {
    sum += cuboidSize(cube);
  }

  console.log(sum);

  return 0;
};
