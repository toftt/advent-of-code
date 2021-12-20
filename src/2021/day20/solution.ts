import { readInput, sections, SparseGrid } from "~utils";

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const [enhance, img] = sections(input);

  const grid = SparseGrid.fromString2(img);

  for (let step = 0; step < 2; step++) {
    const { min: xMin, max: xMax } = grid.bounds.x;
    const { min: yMin, max: yMax } = grid.bounds.y;

    for (let i = xMin - 2; i <= xMax; i++) {
      for (let j = yMin - 2; j <= yMax; j++) {
        let binNum = "";
        for (let r = 0; r < 3; r++) {
          for (let c = 0; c < 3; c++) {
            const pixel =
              grid.get({ x: i + c, y: j + r }) ?? (step % 2 === 0 ? "." : "#");
            if (pixel === "#") binNum += "1";
            else binNum += "0";
          }
        }
        const num = parseInt(binNum, 2);
        const val = enhance[num];

        grid.set({ x: i, y: j }, val);
      }
    }
  }

  return grid.values().filter((x) => x === "#").length;
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const [enhance, img] = sections(input);

  const grid = SparseGrid.fromString2(img);

  for (let step = 0; step < 50; step++) {
    const { min: xMin, max: xMax } = grid.bounds.x;
    const { min: yMin, max: yMax } = grid.bounds.y;

    for (let i = xMin - 2; i <= xMax; i++) {
      for (let j = yMin - 2; j <= yMax; j++) {
        let binNum = "";
        for (let r = 0; r < 3; r++) {
          for (let c = 0; c < 3; c++) {
            const pixel =
              grid.get({ x: i + c, y: j + r }) ?? (step % 2 === 0 ? "." : "#");
            if (pixel === "#") binNum += "1";
            else binNum += "0";
          }
        }
        const num = parseInt(binNum, 2);
        const val = enhance[num];

        grid.set({ x: i, y: j }, val);
      }
    }
  }

  return grid.values().filter((x) => x === "#").length;
};
