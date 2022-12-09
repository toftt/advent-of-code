import { add, lineify, readInput } from "~utils";

interface Directory {
  name: string;
  parent: Directory | null;
  directories: { [name: string]: Directory };
  files: { [name: string]: File };
}

interface File {
  name: string;
  size: number;
}

const getSize = (dir: Directory): number => {
  return (
    Object.values(dir.files).reduce((acc, file) => acc + file.size, 0) +
    Object.values(dir.directories).reduce((acc, dir) => acc + getSize(dir), 0)
  );
};

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const instructions = lineify(input);

  const rootDir: Directory = {
    name: "/",
    directories: {},
    files: {},
    parent: null,
  };
  const allDirectories: Directory[] = [rootDir];

  let currentDir = rootDir;
  let current = 0;

  while (current < instructions.length) {
    const ins = instructions[current];
    const parts = ins.split(" ");

    if (parts[0] === "$") {
      if (parts[1] === "cd") {
        if (parts[2] === "/") {
          currentDir = rootDir;
        } else if (parts[2] === "..") {
          currentDir = currentDir.parent!;
        } else {
          currentDir = currentDir.directories[parts[2]];
        }
      }
    } else if (parts[0] === "dir") {
      const dirName = parts[1];
      if (!currentDir.directories[dirName]) {
        currentDir.directories[dirName] = {
          name: dirName,
          files: {},
          directories: {},
          parent: currentDir,
        };
        allDirectories.push(currentDir.directories[dirName]);
      }

      currentDir.directories[dirName];
    } else {
      const [size, fileName] = parts;
      currentDir.files[fileName] = { name: fileName, size: parseInt(size) };
    }

    current++;
  }

  console.log(getSize(rootDir));

  return allDirectories
    .map((dir) => getSize(dir))
    .filter((size) => size <= 100000)
    .reduce(add);
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const instructions = lineify(input);

  const rootDir: Directory = {
    name: "/",
    directories: {},
    files: {},
    parent: null,
  };
  const allDirectories: Directory[] = [rootDir];

  let currentDir = rootDir;
  let current = 0;

  while (current < instructions.length) {
    const ins = instructions[current];
    const parts = ins.split(" ");

    if (parts[0] === "$") {
      if (parts[1] === "cd") {
        if (parts[2] === "/") {
          currentDir = rootDir;
        } else if (parts[2] === "..") {
          currentDir = currentDir.parent!;
        } else {
          currentDir = currentDir.directories[parts[2]];
        }
      }
    } else if (parts[0] === "dir") {
      const dirName = parts[1];
      if (!currentDir.directories[dirName]) {
        currentDir.directories[dirName] = {
          name: dirName,
          files: {},
          directories: {},
          parent: currentDir,
        };
        allDirectories.push(currentDir.directories[dirName]);
      }

      currentDir.directories[dirName];
    } else {
      const [size, fileName] = parts;
      currentDir.files[fileName] = { name: fileName, size: parseInt(size) };
    }

    current++;
  }

  const TOTAL_DISK_SPACE = 70000000;
  const NEEDED_DISK_SPACE = 30000000;

  const rootDirSize = getSize(rootDir);

  const currentSpaceLeft = TOTAL_DISK_SPACE - rootDirSize;
  const requiredSizeToDelete = NEEDED_DISK_SPACE - currentSpaceLeft;

  const result = allDirectories
    .map((dir) => getSize(dir))
    .filter((size) => size >= requiredSizeToDelete)
    .sort((a, b) => a - b);

  return result[0];
};
