import path from "path";
import fs from "fs";

import { getSubDirNames } from "./utils";
import { paths } from "../paths";

export const generateExports = () => {
  const yearFolderNames = getSubDirNames(paths.srcFolder).filter((folderName) =>
    /\d{4}/.test(folderName)
  );

  for (const name of yearFolderNames) {
    const folderPath = path.join(paths.srcFolder, name);
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
