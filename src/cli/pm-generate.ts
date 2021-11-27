import { Command } from "commander";
import { generateDay } from "./generateDay";
import { generateExports } from "./generateExports";
import { generateRunFile } from "./generateRunFile";

const year = process.env.YEAR;
const program = new Command();

if (!year) {
  throw new Error("no year");
}

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
  .action((day) => {
    generateDay(year, day);
    generateExports();
    generateRunFile();
  });

program.parse(process.argv);
