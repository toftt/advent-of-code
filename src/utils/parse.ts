/**
 * Returns all numbers (`/\d+/g`) in a string.
 *
 */
export const intify = (str: string): number[] => {
  const matches = str.matchAll(/\-?\d+/g);

  return [...matches].map((match) => parseInt(match[0]));
};

/**
 * Splits a string on line breaks.
 */
export const lineify = (str: string): string[] => {
  return str.split(/\r?\n/);
};

/**
 * Splits a string on double line breaks.
 */
export const sections = (str: string): string[] => {
  return str.split(/\r?\n\r?\n/);
};

/**
 * Shortcut for `.map(s => parseInt(s))`
 */
export const parseInts = (strArr: string[]): number[] => {
  return strArr.map((s) => parseInt(s));
};
