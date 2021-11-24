import { Command } from "commander";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

dotenv.config();

const srcFolderPath = __dirname;
const currentYear = process.env.YEAR ?? "2015";

const getSubDirNames = (dir: string) => {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
};

const generateExports = () => {
  const yearFolderNames = getSubDirNames(srcFolderPath).filter((folderName) =>
    /\d{4}/.test(folderName)
  );

  for (const name of yearFolderNames) {
    const folderPath = path.join(srcFolderPath, name);
    const dayFolders = getSubDirNames(folderPath);

    const imports = dayFolders
      .map((name) => `import * as ${name} from "./${name}/solution";`)
      .join("\n");

    const exports = dayFolders.map((name) => `export {${name}};`).join("\n");

    const result = `// This file is auto-generated -- do not modify.
${imports}

${exports}`;

    fs.writeFileSync(path.join(folderPath, "index.ts"), result);
  }
};

const createDay = (day: string) => {
  const yearFolder = path.join(srcFolderPath, currentYear);
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

const program = new Command();

program
  .command("generate <day>")
  .description("Generate a solution file for day <day>.")
  .action((day) => {
    createDay(day);
    generateExports();
  });

program.parse(process.argv);
