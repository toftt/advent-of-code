import { Command } from "commander";
import { generateDay } from "./generateDay";
import { generateExports } from "./generateExports";
import { generateRunFile } from "./generateRunFile";

const yearFromEnv = process.env.YEAR;
const program = new Command();

program
  .command("runfile")
  .alias("r")
  .description("Generate run file and needed imports/exports.")
  .action(() => {
    generateExports();
    generateRunFile();
  });

program
  .command("day <day>")
  .alias("d")
  .description("Generate a solution file for day <day>.")
  .option("-y, --year <year>", "override year")
  .action((day, options) => {
    const year = options.year ?? yearFromEnv;

    if (!year) {
      throw new Error("no year");
    }

    generateDay(year, day);
    generateExports();
    generateRunFile();
  });

program.parse(process.argv);
