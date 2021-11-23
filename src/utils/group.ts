export const group = <T>(
  iterable: Iterable<T>,
  size: number,
  allowUnequalGroups = false
) => {
  if (size < 2) {
    throw new Error("You can't have a size less than 2.");
  }

  const result: T[][] = [];

  let currentGroup: T[] = [];

  for (const element of iterable) {
    currentGroup.push(element);

    if (currentGroup.length >= size) {
      result.push(currentGroup);
      currentGroup = [];
    }
  }

  if (currentGroup.length !== 0) {
    if (allowUnequalGroups) {
      result.push(currentGroup);
    } else {
      throw new Error(`Number of elements not evenly divisible by ${size}`);
    }
  }

  return result;
};
