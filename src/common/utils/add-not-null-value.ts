/**
 * Returns an object with a key-value pair if the value is not null or undefined.
 *
 * @param key - The key to be used in the resulting object.
 * @param value - The value to be added if not null or undefined.
 * @returns An object containing the key and value if value is not null/undefined, otherwise an empty object.
 */
export const addNotNullValue = <K extends string, T>(
  key: K,
  value: T,
): { [P in K]?: NonNullable<T> } => {
  if (value !== null && value !== undefined) {
    return { [key]: value } as { [P in K]: NonNullable<T> };
  }
  return {};
};
