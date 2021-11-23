export const intify = (str: string): number[] => {
  const matches = str.matchAll(/\d+/g);

  return [...matches].map((match) => parseInt(match[0]));
};
