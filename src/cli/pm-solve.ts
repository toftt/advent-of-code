import { Command } from "commander";
import { runSolution } from "./run";

const year = process.env.YEAR;
const program = new Command();

program.option("-t, --test", "run against 'test' input file");

if (!year) {
  throw new Error("no year");
}

program.parse(process.argv);

const [day, part] = program.args[0].split(".");

if (!day || !part) {
  throw new Error("no day arg");
}

runSolution(year, day, part, program.opts().test);
