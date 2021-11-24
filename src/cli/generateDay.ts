import path from "path";
import fs from "fs";

import { paths } from "../paths";

export const generateDay = (day: string, year: string) => {
  const yearFolder = path.join(paths.srcFolder, year);
  const exists = fs.existsSync(yearFolder);

  if (!exists) {
    fs.mkdirSync(yearFolder);
  }

  const dayFolder = path.join(yearFolder, `day${day}`);

  if (fs.existsSync(dayFolder)) {
    throw new Error(`Folder for day ${day} already exists.`);
  }

  fs.mkdirSync(dayFolder);

  const text = `import { readInput } from "~utils";

const input = readInput();

export const part1 = () => {
	//
};

export const part2 = () => {
	//
};`;

  fs.writeFileSync(path.join(dayFolder, "solution.ts"), text);
};
