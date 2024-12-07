export const zip = <A, B>(a: A[], b: B[]): [A, B][] => {
  if (a.length !== b.length) {
    throw new Error("arrays have to be of same length");
  }

  const result: [A, B][] = [];
  for (let i = 0; i < a.length; i++) {
    result.push([a[i], b[i]]);
  }

  return result;
};
export const zipMany = <T>(...arrays: T[][]): T[][] => {
  if (arrays.length < 2) throw new Error("need at least 2 arrays");

  const len = arrays[0].length;
  if (!arrays.every((x) => (x.length = len)))
    throw new Error("arrays have to be of same length");

  const result: T[][] = [];
  for (let i = 0; i < len; i++) {
    result.push(arrays.map((x) => x[i]));
  }

  return result;
};

export const transpose = <T>(matrix: T[][]): T[][] => {
  return zipMany(...matrix);
};

export const findIndex = <T>(arr: T[][], el: T): [number, number] | null => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === el) return [i, j];
    }
  }

  return null;
};
