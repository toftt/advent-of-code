import path from "path";
import fs from "fs";
import { Command } from "commander";
import axios from "axios";
import { paths } from "paths";

const envYear = process.env.YEAR;
const sessionCookie = process.env.SESSION_COOKIE;

const program = new Command();

program.option("-y, --year <year>");

program.parse(process.argv);

const year = program.opts().year ?? envYear;

const [day] = program.args;

if (!day) {
  throw new Error("no day");
}
if (!year) {
  throw new Error("no year");
}
if (!sessionCookie) {
  throw new Error("no session cookie");
}

const targetFolder = path.join(paths.srcFolder, year, `day${day}`);

if (!fs.existsSync(targetFolder)) {
  throw new Error(`Can't find folder ${targetFolder}`);
}

axios
  .get<string>(`https://adventofcode.com/${year}/day/${day}/input`, {
    headers: {
      cookie: `session=${sessionCookie}`,
    },
  })
  .then((response) => {
    const inputPath = path.join(targetFolder, "input");
    fs.writeFileSync(inputPath, response.data.trim());
  })
  .catch((error) => {
    console.error(error);
  });
