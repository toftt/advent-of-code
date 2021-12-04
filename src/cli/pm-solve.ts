import { Command } from "commander";
import { runSolution } from "./run";

const envYear = process.env.YEAR;
const program = new Command();

program.option("-t, --test", "run against 'test' input file");
program.option("-y --year <year>");

program.parse(process.argv);

const [day, part] = program.args[0].split(".");
const year = program.opts().year ?? envYear;

if (!day || !part) {
  throw new Error("no day arg");
}

if (!year) {
  throw new Error("no year");
}

runSolution(year, day, part, program.opts().test);
