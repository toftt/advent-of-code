import path from "path";
import fs from "fs";
import handlebars from "handlebars";

import { paths } from "../paths";
import { format } from "prettier";

export const generateDay = (year: string, day: string) => {
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

  const templateText = fs.readFileSync(
    path.join(__dirname, "templates", "solution.hbs"),
    "utf8"
  );
  const template = handlebars.compile(templateText);
  const output = template({});

  const formatted = format(output, { parser: "typescript" });

  fs.writeFileSync(path.join(dayFolder, "solution.ts"), formatted);
  fs.writeFileSync(path.join(dayFolder, "input"), "");
};
