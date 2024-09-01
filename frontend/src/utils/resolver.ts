const resolveStringArrConflict = (
  longer: string[],
  shorter: string[],
): string => {
  shorter.forEach((se, si) => {
    const inBoth = longer.findIndex((le) => le === se);
    console.log("inBoth: ", inBoth);
    if (inBoth === -1) {
      console.log("not in both");
      console.log("si: ", si);
      console.log("se: ", se);

      longer.splice(si, 0, se);
    }
  });
  const merged = longer.join(" ");
  console.log("merged: ", merged);
  return merged;
};

export const mergeString = (firstString: string, secondString: string) => {
  const firstArray = firstString.split(" ").filter(Boolean);
  const secondArray = secondString.split(" ").filter(Boolean);

  console.log("firstArray: ", firstArray);
  console.log("secondArray: ", secondArray);
  console.log("first len: ", firstArray.length);
  console.log("second len: ", secondArray.length);

  const isFirstL = firstArray.length >= secondArray.length;

  const mergedString = isFirstL
    ? resolveStringArrConflict(firstArray, secondArray)
    : resolveStringArrConflict(secondArray, firstArray);

  return mergedString;
};
