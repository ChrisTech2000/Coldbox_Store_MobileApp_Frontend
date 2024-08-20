export function sumCropValues(cropData: { [key: string]: { [key: string]: number } }): {
  [key: string]: number;
} {
  const result: { [key: string]: number } = {};

  for (const key in cropData) {
    if (Object.hasOwn(cropData, key)) {
      const innerObj = cropData[key];

      for (const crop in innerObj) {
        if (Object.hasOwn(innerObj, crop)) {
          if (result[crop]) {
            result[crop] += innerObj[crop];
          } else {
            result[crop] = innerObj[crop];
          }
        }
      }
    }
  }

  return result;
}
