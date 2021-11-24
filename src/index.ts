import { Command } from "commander";
import dotenv from "dotenv";
import { generateDay } from "cli/generateDay";
import { generateExports } from "cli/generateExports";
import { generateRunFile } from "cli/generateRunFile";
import { runSolution } from "run";

dotenv.config();

const year = process.env.YEAR ?? "2015";

const program = new Command();

program
  .command("gen-day <day>")
  .description("Generate a solution file for day <day>.")
  .action((day) => {
    generateDay(year, day);
    generateExports();
    generateRunFile();
  });
program
  .command("gen-run-file")
  .description("Generate run file and needed imports/exports.")
  .action(() => {
    generateExports();
    generateRunFile();
  });
program
  .command("solve <day>")
  .description("Run solution for a specified day.")
  .action((day) => {
    runSolution(year, day);
  });

program.parse(process.argv);
