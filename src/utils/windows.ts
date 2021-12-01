/**
 * Returns an array of consecutive sliding windows of a specified size.
 *
 * @example windows([1, 2, 3], 2) // -> [[1, 2], [2, 3]]
 */
export const windows = <T>(elements: T[], size: number): T[][] => {
  if (size < 0) throw new Error("size has to be bigger than 0");

  const result: T[][] = [];

  for (let i = 0; i < elements.length - size + 1; i++) {
    result.push(elements.slice(i, i + size));
  }

  return result;
};
