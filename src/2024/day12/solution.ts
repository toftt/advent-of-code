import {
  manhattanDistance,
  Position,
  readInput,
  SparseGrid,
  StringifiedSet,
  sum,
} from "~utils";

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const grid = SparseGrid.fromString2(input);
  grid.print();

  const s = { x: 1, y: 1 };

  const seen = new StringifiedSet<Position>();
  let toVisit: Position[] = [];
  toVisit.push(s);

  const allRegions: any[] = [];
  let curRegion = {
    value: grid.get(s)!,
    size: 0,
    perimeter: 0,
    points: [] as Position[],
  };
  while (toVisit.length > 0) {
    const cur = toVisit.pop()!;
    if (seen.has(cur)) continue;

    seen.add(cur);
    const curValue = grid.get(cur)!;

    if (curRegion.value !== curValue) {
      allRegions.push(curRegion);
      curRegion = { value: curValue, size: 0, perimeter: 0, points: [] };
    } else {
      const manhattan = Math.min(
        ...curRegion.points.map((x) => manhattanDistance(x, cur)),
      );
      if (manhattan > 1) {
        allRegions.push(curRegion);
        curRegion = { value: curValue, size: 0, perimeter: 0, points: [] };
      }
    }

    // console.log(curValue);
    const adj = grid.adjecent(cur, { bounded: false });
    const adjBounded = grid.adjecent(cur, { bounded: true });
    // if (!m.has(curValue)) m.set(curValue, { size: 0, perimeter: 0 });

    curRegion.size += 1;
    const non = adj.filter((x) => grid.get(x) !== curValue).length;
    curRegion.perimeter += non;
    curRegion.points.push(cur);

    for (const x of adjBounded) {
      if (!seen.has(x)) {
        // console.log("pushing", grid.get(x), x);
        toVisit.push(x);
      }
    }
    toVisit = [
      ...toVisit.filter((x) => grid.get(x) !== curValue),
      ...toVisit.filter((x) => grid.get(x) === curValue),
    ];
  }
  allRegions.push(curRegion);

  // console.log(allRegions);
  // console.log(toVisit);
  // grid.print();

  return sum(allRegions.map((x) => x.size * x.perimeter));
};

const countSides = (p: any) => {
  const groups = [];
  let cg: any[] = [];
  while (p.length > 0) {
    const cur = p.pop();
    cg.push(cur);

    let idx = p.findIndex((x: any) =>
      cg.some(
        (c) =>
          c.d.x === x.d.x &&
          c.d.y === x.d.y &&
          manhattanDistance(c.p, x.p) === 1,
      ),
    );
    // console.log("ass");
    while (idx !== -1) {
      const toAdd = p.splice(idx, 1)[0];
      cg.push(toAdd);
      // console.log("toAdd", toAdd);
      // console.log("p", p);
      // console.log("cg", cg);
      // console.log("idx", idx);
      idx = p.findIndex((x: any) =>
        cg.some(
          (c) =>
            c.d.x === x.d.x &&
            c.d.y === x.d.y &&
            manhattanDistance(c.p, x.p) === 1,
        ),
      );
    }
    groups.push(cg);
    cg = [];
  }
  return groups.length;
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const grid = SparseGrid.fromString2(input);
  // grid.print();

  const s = { x: 1, y: 1 };

  const seen = new StringifiedSet<Position>();
  let toVisit: Position[] = [];
  toVisit.push(s);

  const allRegions: any[] = [];
  let curRegion = {
    value: grid.get(s)!,
    size: 0,
    perimeter: 0,
    points: [] as Position[],
    perimeterPoints: [] as any[],
  };
  while (toVisit.length > 0) {
    const cur = toVisit.pop()!;
    if (seen.has(cur)) continue;

    seen.add(cur);
    const curValue = grid.get(cur)!;

    if (curRegion.value !== curValue) {
      allRegions.push(curRegion);
      curRegion = {
        value: curValue,
        size: 0,
        perimeter: 0,
        points: [],
        perimeterPoints: [],
      };
    } else {
      const manhattan = Math.min(
        ...curRegion.points.map((x) => manhattanDistance(x, cur)),
      );
      if (manhattan > 1) {
        allRegions.push(curRegion);
        curRegion = {
          value: curValue,
          size: 0,
          perimeter: 0,
          points: [],
          perimeterPoints: [],
        };
      }
    }

    // console.log(curValue);
    const adj = grid.adjecent(cur, { bounded: false });
    const adjBounded = grid.adjecent(cur, { bounded: true });
    // if (!m.has(curValue)) m.set(curValue, { size: 0, perimeter: 0 });

    curRegion.size += 1;
    const non = adj.filter((x) => grid.get(x) !== curValue);
    curRegion.perimeter += non.length;
    curRegion.perimeterPoints = curRegion.perimeterPoints.concat(
      non.map((xx) => ({ p: cur, d: { x: cur.x - xx.x, y: cur.y - xx.y } })),
    );
    curRegion.points.push(cur);

    for (const x of adjBounded) {
      if (!seen.has(x)) {
        // console.log("pushing", grid.get(x), x);
        toVisit.push(x);
      }
    }
    toVisit = [
      ...toVisit.filter((x) => grid.get(x) !== curValue),
      ...toVisit.filter((x) => grid.get(x) === curValue),
    ];
  }
  allRegions.push(curRegion);

  // console.log(allRegions);
  // console.log(toVisit);
  // grid.print();

  return sum(allRegions.map((x) => x.size * countSides(x.perimeterPoints)));
};

// E needs 4 fences
// XX
// XEE needs 3 fences
