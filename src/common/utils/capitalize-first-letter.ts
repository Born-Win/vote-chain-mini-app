export const capitalizeFirstLetter = (word: string): string => {
  if (word.length === 0) {
    return '';
  }

  return word.replace(/\w/, (l: string): string => l.toUpperCase());
};
