import {
  lineify,
  Position,
  PriorityQueue,
  readInput,
  SparseGrid,
  StringifiedSet,
} from "~utils";

class PositionSet {
  private readonly set = new Set<string>();

  add(p: Position) {
    this.set.add(SparseGrid.positionToString(p));
  }

  has(p: Position) {
    return this.set.has(SparseGrid.positionToString(p));
  }

  keys() {
    return [...this.set.keys()].map((x) => SparseGrid.stringToPosition(x));
  }

  delete(p: Position) {
    this.set.delete(SparseGrid.positionToString(p));
  }

  get size() {
    return this.set.size;
  }
}

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const grid = SparseGrid.fromString(input);

  const dist = new Map();
  const prev = new Map();

  const q = new PositionSet();

  grid.keys().forEach((p) => {
    dist.set(SparseGrid.positionToString(p), Infinity);
    prev.set(SparseGrid.positionToString(p), undefined);

    q.add(p);
  });

  dist.set(SparseGrid.positionToString({ x: 0, y: 0 }), 0);

  while (q.size > 0) {
    const u = q
      .keys()
      .sort(
        (a, b) =>
          dist.get(SparseGrid.positionToString(b)) -
          dist.get(SparseGrid.positionToString(a))
      )
      .pop()!;

    q.delete(u);

    if (u.x === grid.bounds.x.max && u.y === grid.bounds.y.max) {
      console.log("found target!");
      break;
    }

    grid
      .adjecent(u, { bounded: true })
      .filter((adjPos) => q.has(adjPos))
      .forEach((v) => {
        //
        const alt = dist.get(SparseGrid.positionToString(u)) + grid.get(v)!;

        if (alt < dist.get(SparseGrid.positionToString(v))) {
          dist.set(SparseGrid.positionToString(v), alt);
          prev.set(SparseGrid.positionToString(v), u);
        }
      });
  }

  // const s: Position[] = [];
  // let sum = 0;
  // let u = { x: 9, y: 9 };

  // while (u) {
  //   s.unshift(u);
  //   u = prev.get(SparseGrid.positionToString(u));
  // }

  return dist.get(
    SparseGrid.positionToString({ x: grid.bounds.x.max, y: grid.bounds.y.max })
  );

  // const q = new PriorityQueue(
  //   [
  //     {
  //       x: 0,
  //       y: 0,
  //       len: 0,
  //       seen: new StringifiedSet<Position>().add({ x: 0, y: 0 }),
  //     },
  //   ],
  //   (a, b) => a.len < b.len
  // );

  // while (true) {
  //   const cur = q.pop()!;
  //   // console.log({ cur });
  //   // console.log(cur);

  //   if (cur.x === 9 && cur.y === 9) {
  //     console.log(cur);
  //     break;
  //   }

  //   const adj = grid.adjecent(cur, { bounded: true });

  //   const k = adj
  //     .filter((x) => !cur.seen.has(x))
  //     .map((x) => ({ ...x, len: cur.len + grid.get(x)! }));
  //   for (const kk of k) {
  //     q.push({ ...kk, seen: cur.seen.clone().add({ x: kk.x, y: kk.y }) });
  //   }
  // }

  // solution here
  return -1;
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const grid = SparseGrid.fromString(input);
  const extendedGrid = new SparseGrid<number>();

  const [xMin, xMax, yMin, yMax] = [
    grid.bounds.x.min,
    grid.bounds.x.max,
    grid.bounds.y.min,
    grid.bounds.y.max,
  ];

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      const addedRisk = i + j;

      for (const [pos, val] of grid.entries()) {
        const newPos = { x: (xMax + 1) * i + pos.x, y: (yMax + 1) * j + pos.y };
        // console.log({ pos, newPos });
        const newRisk =
          val + addedRisk < 10 ? val + addedRisk : ((val + addedRisk) % 10) + 1;
        extendedGrid.set(newPos, newRisk);
      }
    }
  }

  // extendedGrid.print();

  const dist = new Map();
  const prev = new Map();

  const q = new PositionSet();
  const pq = new PriorityQueue<Position>(
    [],
    (a, b) =>
      dist.get(SparseGrid.positionToString(a)) <
      dist.get(SparseGrid.positionToString(b))
  );

  extendedGrid.keys().forEach((p) => {
    dist.set(SparseGrid.positionToString(p), Infinity);
    prev.set(SparseGrid.positionToString(p), undefined);

    q.add(p);
    pq.push(p);
  });

  dist.set(SparseGrid.positionToString({ x: 0, y: 0 }), 0);
  pq.increasePriority((el) => el.x === 0 && el.y === 0, { x: 0, y: 0 });

  let its = 0;
  while (q.size > 0) {
    // if (its % 10000 === 0) console.log(q.size);

    const u = pq.pop();
    q.delete(u);

    if (
      u.x === extendedGrid.bounds.x.max &&
      u.y === extendedGrid.bounds.y.max
    ) {
      console.log("found target!");
      break;
    }

    extendedGrid
      .adjecent(u, { bounded: true })
      .filter((adjPos) => q.has(adjPos))
      .forEach((v) => {
        //
        const alt =
          dist.get(SparseGrid.positionToString(u)) + extendedGrid.get(v)!;

        if (alt < dist.get(SparseGrid.positionToString(v))) {
          dist.set(SparseGrid.positionToString(v), alt);
          prev.set(SparseGrid.positionToString(v), u);

          pq.increasePriority((el) => el.x === v.x && el.y === v.y, {
            x: v.x,
            y: v.y,
          });
        }
      });
  }

  // const s: Position[] = [];
  // let sum = 0;
  // let u = { x: 9, y: 9 };

  // while (u) {
  //   s.unshift(u);
  //   u = prev.get(SparseGrid.positionToString(u));
  // }

  return dist.get(
    SparseGrid.positionToString({
      x: extendedGrid.bounds.x.max,
      y: extendedGrid.bounds.y.max,
    })
  );

  // const q = new PriorityQueue(
  //   [
  //     {
  //       x: 0,
  //       y: 0,
  //       len: 0,
  //       seen: new StringifiedSet<Position>().add({ x: 0, y: 0 }),
  //     },
  //   ],
  //   (a, b) => a.len < b.len
  // );

  // while (true) {
  //   const cur = q.pop()!;
  //   // console.log({ cur });
  //   // console.log(cur);

  //   if (cur.x === 9 && cur.y === 9) {
  //     console.log(cur);
  //     break;
  //   }

  //   const adj = grid.adjecent(cur, { bounded: true });

  //   const k = adj
  //     .filter((x) => !cur.seen.has(x))
  //     .map((x) => ({ ...x, len: cur.len + grid.get(x)! }));
  //   for (const kk of k) {
  //     q.push({ ...kk, seen: cur.seen.clone().add({ x: kk.x, y: kk.y }) });
  //   }
  // }

  // solution here
  return -1;
};
