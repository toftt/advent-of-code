import { Command } from "commander";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

dotenv.config();

const getSubDirNames = (dir: string) => {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
};

const generateExports = () => {
  const srcFolderPath = __dirname;

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

const program = new Command();

program
  .command("generate <day>")
  .description("Generate a solution file for day <day>.")
  .action((day) => {
    generateExports();
  });

program.parse(process.argv);
