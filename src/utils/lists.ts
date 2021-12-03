export const zip = <T>(...arrays: T[][]): T[][] => {
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
