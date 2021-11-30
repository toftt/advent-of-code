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

  const solutiontemplateText = fs.readFileSync(
    path.join(__dirname, "templates", "solution.hbs"),
    "utf8"
  );

  const testtemplateText = fs.readFileSync(
    path.join(__dirname, "templates", "solution.test.hbs"),
    "utf8"
  );

  const solutionTemplate = handlebars.compile(solutiontemplateText);
  const testTemplate = handlebars.compile(testtemplateText);

  const solutionOutput = solutionTemplate({});
  const testOutput = testTemplate({ year, day });

  const formattedSolution = format(solutionOutput, { parser: "typescript" });
  const formattedTest = format(testOutput, { parser: "typescript" });

  fs.writeFileSync(path.join(dayFolder, "solution.ts"), formattedSolution);
  fs.writeFileSync(path.join(dayFolder, "solution.test.ts"), formattedTest);
  fs.writeFileSync(path.join(dayFolder, "input"), "");
  fs.writeFileSync(path.join(dayFolder, "test"), "");
};
