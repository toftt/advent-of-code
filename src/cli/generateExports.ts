import path from "path";
import fs from "fs";
import handlebars from "handlebars";

import { getSubDirNames } from "./utils";
import { paths } from "../paths";
import { format } from "prettier";

export const generateExports = () => {
  const yearFolderNames = getSubDirNames(paths.srcFolder).filter((folderName) =>
    /\d{4}/.test(folderName)
  );

  for (const name of yearFolderNames) {
    const folderPath = path.join(paths.srcFolder, name);
    const dayFolders = getSubDirNames(folderPath);

    const templateText = fs.readFileSync(
      path.join(__dirname, "templates", "exportDays.hbs"),
      "utf8"
    );

    const template = handlebars.compile(templateText);
    const output = template({ days: dayFolders });

    const formatted = format(output, { parser: "typescript" });

    fs.writeFileSync(path.join(folderPath, "index.ts"), formatted);
  }
};
