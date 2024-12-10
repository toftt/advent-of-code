import { enumerate, readInput, sum } from "~utils";

export const part1 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const files = input.split("").map((x) => parseInt(x));

  let disk: (number | null)[] = [];
  [...enumerate(files)].forEach(([x, i]) => {
    const id = i % 2 === 0 ? i / 2 : null;
    const a = new Array<number | null>(x).fill(id);
    disk = disk.concat(a);
  });

  for (let i = disk.length - 1; i > 0; i--) {
    const next = disk[i];
    if (next === null) continue;

    const firstEmpty = disk.findIndex((x) => x === null)!;
    if (firstEmpty >= i) break;
    disk[firstEmpty] = next;
    disk[i] = null;
  }

  const result = sum(
    [...enumerate(disk)].map(([x, i]) => (x !== null ? x * i : 0)),
  );

  return result;
};

export const part2 = (useTestData: boolean = false): number => {
  const input = readInput(useTestData);
  const files = input.split("").map((x) => parseInt(x));

  let disk: Array<{ id: number | null; size: number }> = [];
  [...enumerate(files)].forEach(([x, i]) => {
    const id = i % 2 === 0 ? i / 2 : null;
    const file = { id, size: x };
    disk.push(file);
  });

  for (let i = disk.length - 1; i > 0; i--) {
    const next = disk[i];
    if (next.id === null) continue;

    const firstEmpty = disk.findIndex(
      (x) => x.id === null && x.size >= next.size,
    );

    if (firstEmpty === -1) continue;
    if (firstEmpty >= i) continue;

    const replaced = disk[firstEmpty];
    disk[firstEmpty] = next;
    disk[i] = { id: null, size: next.size };

    if (next.size < replaced.size) {
      disk.splice(firstEmpty + 1, 0, {
        id: null,
        size: replaced.size - next.size,
      });
    }
  }

  let total = 0;
  let curIdx = 0;

  for (let slice of disk) {
    if (slice.id !== null) {
      for (let i = 0; i < slice.size; i++) {
        total += curIdx * slice.id;
        curIdx++;
      }
    } else {
      curIdx += slice.size;
    }
  }

  return total;
};
