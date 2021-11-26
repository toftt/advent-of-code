import fs from "fs";
import handlebars from "handlebars";
import path from "path";
import { paths } from "paths";
import { format } from "prettier";
import { getSubDirNames } from "./utils";

const getDayCaseLine = (year: string, day: string) => {
  const dayNumber = day.slice(3);

  return `
case "${dayNumber}": {
	const part1 = year${year}.${day}.part1();
	const part2 = year${year}.${day}.part2();
  console.log({part1, part2});
	break;
};
`;
};

export const generateRunFile = () => {
  const yearFolderNames = getSubDirNames(paths.srcFolder).filter((folderName) =>
    /\d{4}/.test(folderName)
  );

  const structure = yearFolderNames.reduce((acc, folderName) => {
    const yearFolderPath = path.join(paths.srcFolder, folderName);
    acc[folderName] = getSubDirNames(yearFolderPath);
    return acc;
  }, {} as Record<string, string[]>);

  const data = yearFolderNames.map((name) => ({
    year: name,
    days: getSubDirNames(path.join(paths.srcFolder, name)).map((day) =>
      day.slice(3)
    ),
  }));

  const templateText = fs.readFileSync(
    path.join(__dirname, "templates", "runFile.hbs"),
    "utf8"
  );
  const template = handlebars.compile(templateText);
  const output = template({ years: data });

  const formatted = format(output, { parser: "typescript" });

  fs.writeFileSync(path.join(paths.srcFolder, "cli/run.ts"), formatted);
};
