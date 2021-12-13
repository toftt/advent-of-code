import { lineify, readInput, sections, SparseGrid } from "~utils";

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const [coords, inst] = sections(input);

  const grid = new SparseGrid<string>();

  for (const coord of lineify(coords)) {
    const [x, y] = coord.split(",").map((x) => parseInt(x));

    grid.set({ x, y }, "#");
  }

  const instes = lineify(inst);
  for (const instruction of [instes[0]]) {
    const [axis, n] = instruction.split(" ")[2].split("=");
    const num = parseInt(n);

    for (const [key, value] of grid.entries()) {
      if (axis === "x") {
        if (key.x < num) continue;

        const newX = num - (key.x - num);
        grid.set({ x: newX, y: key.y }, value);
        grid.delete(key);
      } else {
        if (key.y < num) continue;

        const newY = num - (key.y - num);
        grid.set({ x: key.x, y: newY }, value);
        grid.delete(key);
      }
    }
  }

  return grid.values().length;
};

export const part2 = (useTestData: boolean = false): number | string => {
  const input = readInput(useTestData);
  const [coords, inst] = sections(input);

  const grid = new SparseGrid<string>();

  for (const coord of lineify(coords)) {
    const [x, y] = coord.split(",").map((x) => parseInt(x));

    grid.set({ x, y }, "#");
  }

  const instes = lineify(inst);
  for (const instruction of instes) {
    const [axis, n] = instruction.split(" ")[2].split("=");
    const num = parseInt(n);

    for (const [key, value] of grid.entries()) {
      if (axis === "x") {
        if (key.x < num) continue;

        const newX = num - (key.x - num);
        grid.set({ x: newX, y: key.y }, value);
        grid.delete(key);
      } else {
        if (key.y < num) continue;

        const newY = num - (key.y - num);
        grid.set({ x: key.x, y: newY }, value);
        grid.delete(key);
      }
    }
  }

  const rows: string[] = [];
  for (let y = 0; y < 6; y++) {
    const row: string[] = [];
    for (let x = 0; x <= 38; x++) {
      const k = grid.get({ x, y });
      row.push(k ?? ".");
    }
    rows.push(row.join(""));
  }

  return rows.join("\n");
};
