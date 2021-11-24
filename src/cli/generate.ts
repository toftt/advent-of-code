import fs from "fs";
import path from "path";
import { paths } from "paths";
import prettier from "prettier";

const getSubDirNames = (dir: string) => {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
};

const getDayCaseLine = (year: string, day: string) => {
  const dayNumber = day.slice(3);

  return `
case "${dayNumber}": {
	year${year}.${day}.part1();
	year${year}.${day}.part2();
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

  const statements = Object.entries(structure)
    .map(([year, days]) => {
      return `
case "${year}": {
	switch(day) {
		${days.map((day) => getDayCaseLine(year, day)).join("\n")}
	}
	break;
}
`;
    })
    .join("\n");

  const imports = yearFolderNames
    .map((n) => {
      return `import * as year${n} from "./${n}"`;
    })
    .join("\n");

  const result = `
${imports}

export const run = (year: string, day: string) => {
	switch (year) {
		${statements}

	};
};
`;

  const formatted = prettier.format(result, { parser: "typescript" });

  fs.writeFileSync(path.join(paths.srcFolder, "run.ts"), formatted);
};

generateRunFile();
