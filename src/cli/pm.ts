import { Command } from "commander";
import dotenv from "dotenv";

dotenv.config();

const program = new Command();

program.command("solve <day>.<part>", "Run solution for a specified day.");
program.command("generate <type>", "Generate a solution folder or run file.");
program.command("get-input <day>", "Fetch the input for a specified day,");

program.parse(process.argv);
