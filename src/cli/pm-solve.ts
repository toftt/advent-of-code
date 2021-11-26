import { Command } from "commander";
import { runSolution } from "./run";

const year = process.env.YEAR;
const program = new Command();

if (!year) {
  throw new Error("no year");
}

program.parse(process.argv);

const [day, part] = program.args[0].split(".");

if (!day || !part) {
  throw new Error("no day arg");
}

runSolution(year, day, part);
