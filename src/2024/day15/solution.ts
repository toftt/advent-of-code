import {
  Direction,
  lineify,
  move,
  Position,
  readInput,
  REVERESED_DIRECTIONS,
  sections,
  SparseGrid,
  StringifiedSet,
  sum,
} from "~utils";

const DIRS = {
  "^": Direction.N,
  v: Direction.S,
  "<": Direction.W,
  ">": Direction.E,
};

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const [x, y] = sections(input);
  const grid = SparseGrid.fromString2(x);
  const moves: Direction[] = lineify(y)
    .join("")
    .split("")
    .map((x) => DIRS[x as keyof typeof DIRS]);

  let [[robotPos]] = [...grid.entries()].filter(([_, v]) => v === "@");

  for (const dir of moves) {
    let att = move(robotPos, dir);
    if (grid.get(att) === ".") {
      grid.set(att, "@");
      grid.set(robotPos, ".");
      robotPos = att;
    } else if (grid.get(att) === "#") {
      continue;
    } else {
      let nrBoulders = 0;
      while (grid.get(att) === "O") {
        att = move(att, dir);
        nrBoulders += 1;
      }
      if (grid.get(att) === ".") {
        const r = REVERESED_DIRECTIONS[dir];
        for (let i = 0; i < nrBoulders; i++) {
          grid.set(att, "O");
          att = move(att, r);
        }
        grid.set(att, "@");
        grid.set(robotPos, ".");
        robotPos = att;
      }
    }
  }

  grid.print();

  const result = sum(
    grid
      .entries()
      .filter((x) => x[1] === "O")
      .map((x) => 100 * x[0].y + x[0].x),
  );

  return result;
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const [x, y] = sections(input);
  // const xx = x;
  const xx = lineify(x)
    .map((l) => {
      return l
        .split("")
        .flatMap((a) => {
          if (a === "#") return ["#", "#"];
          if (a === "O") return ["[", "]"];
          if (a === ".") return [".", "."];
          if (a === "@") return ["@", "."];
          return [];
        })
        .join("");
    })
    .join("\n");

  const grid = SparseGrid.fromString2(xx);
  const moves: Direction[] = lineify(y)
    .join("")
    .split("")
    .map((x) => DIRS[x as keyof typeof DIRS]);

  let [[robotPos]] = [...grid.entries()].filter(([_, v]) => v === "@");

  for (const dir of moves) {
    let att = move(robotPos, dir);
    if (grid.get(att) === ".") {
      grid.set(att, "@");
      grid.set(robotPos, ".");
      robotPos = att;
    } else if (grid.get(att) === "#") {
      continue;
    } else if ([Direction.W, Direction.E].includes(dir)) {
      let nrBoulders = 0;
      while (["[", "]"].includes(grid.get(att)!)) {
        att = move(att, dir);
        nrBoulders += 1;
      }
      if (grid.get(att) === ".") {
        const r = REVERESED_DIRECTIONS[dir];
        for (let i = 0; i < nrBoulders; i++) {
          grid.set(att, grid.get(move(att, r))!);
          att = move(att, r);
        }
        grid.set(att, "@");
        grid.set(robotPos, ".");
        robotPos = att;
      }
    } else {
      // we're moving up/down and pushing a boulder
      let cur =
        grid.get(att) === "["
          ? [att, move(att, Direction.E)]
          : [att, move(att, Direction.W)];
      const occ = new StringifiedSet<Position>();

      while (cur.some((o) => ["[", "]"].includes(grid.get(o)!))) {
        const f = cur.filter((o) => ["[", "]"].includes(grid.get(o)!));
        const newF = f.flatMap((o) =>
          grid.get(o) === "["
            ? [o, move(o, Direction.E)]
            : [o, move(o, Direction.W)],
        );
        newF.forEach((b) => {
          occ.add(b);
        });

        const dd = new StringifiedSet<Position>();
        newF.forEach((o) => {
          dd.add(move(o, dir));
        });
        cur = dd.keys();
      }

      const canMove = occ.keys().every((o) => grid.get(move(o, dir)) !== "#");
      const sorted = occ
        .keys()
        .sort((a, b) => (dir === Direction.N ? a.y - b.y : b.y - a.y));

      if (canMove) {
        for (const s of sorted) {
          grid.set(move(s, dir), grid.get(s)!);
          grid.set(s, ".");
        }
        grid.set(robotPos, ".");
        grid.set(move(robotPos, dir), "@");
        robotPos = move(robotPos, dir);
      }
    }
  }

  const result = sum(
    grid
      .entries()
      .filter((x) => x[1] === "[")
      .map((x) => 100 * x[0].y + x[0].x),
  );

  return result;
};
