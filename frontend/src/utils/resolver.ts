const resolveStringArrConflict = (
  longer: string[],
  shorter: string[],
): string => {
  shorter.forEach((se, si) => {
    const inBoth = longer.findIndex((le) => le === se);
    if (inBoth === -1) longer.splice(si, 0, se);
  });
  return longer.join(" ");
};

export const mergeString = (firstString: string, secondString: string) => {
  const firstArray = firstString.split(" ");
  const secondArray = secondString.split(" ");

  const isFirstL = firstArray.length >= secondArray.length;

  const mergedString = isFirstL
    ? resolveStringArrConflict(firstArray, secondArray)
    : resolveStringArrConflict(secondArray, firstArray);

  return mergedString;
};
