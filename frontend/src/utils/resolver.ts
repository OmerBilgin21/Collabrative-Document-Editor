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

export const mergeString = (stringOne: string, stringTwo: string) => {
  let mergedString = "";
  const oneArr = stringOne.split(" ");
  const twoArr = stringTwo.split(" ");
  if (stringOne && stringTwo) {
    if (oneArr.length > twoArr.length) {
      mergedString = resolveStringArrConflict(oneArr, twoArr);
    } else {
      mergedString = resolveStringArrConflict(twoArr, oneArr);
    }
  }
  return mergedString;
};
