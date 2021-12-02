export const sum = (iterable: Iterable<number>) => {
  let result = 0;
  for (const num of iterable) {
    result += num;
  }

  return result;
};

export function add(a: number): (a: number) => number;
export function add(a: number, b: number): number;
export function add(a: number, b?: number) {
  if (b) return a + b;
  return (num: number) => add(num, a);
}

export function mult(a: number): (a: number) => number;
export function mult(a: number, b: number): number;
export function mult(a: number, b?: number) {
  if (b) return a * b;
  return (num: number) => mult(num, a);
}

export function sub(a: number): (a: number) => number;
export function sub(a: number, b: number): number;
export function sub(a: number, b?: number) {
  if (b) return a - b;
  return (num: number) => sub(num, a);
}

export const combinations = <T>(elements: T[], size: number): T[][] => {
  if (size === 1) {
    return elements.map((x) => [x]);
  }

  const result: T[][] = [];

  let current = elements[0];
  let rest = elements.slice(1);

  while (rest.length) {
    combinations(rest, size - 1).forEach((y) => {
      result.push([current, ...y]);
    });

    current = rest[0];
    rest = rest.slice(1);
  }

  return result;
};

export const oneFromEach = <T>(...collections: T[][]) => {
  if (collections.length < 2) throw Error("you need at least two arguments");

  let result: T[][] = collections.shift()!.map((x) => [x]);

  collections.forEach((collection) => {
    const tmp: T[][] = [];

    result.forEach((combination) => {
      collection.forEach((element) => {
        tmp.push([...combination, element]);
      });
    });
    result = tmp;
  });

  return result;
};

export const allCombinations = <T>(elements: T[], maxSize: number) => {
  const result: T[][] = [];
  for (let i = 1; i <= maxSize; i++) {
    result.push(...combinations(elements, i));
  }

  // empty set
  result.push([]);
  return result;
};
