import safeStringify from 'fast-safe-stringify';

/**
 * Formats a message template by replacing placeholders with corresponding values from the data object.
 *
 * @param message - The message template containing placeholders in the format `{{key}}`.
 * @param data - An object containing key-value pairs where keys match the placeholders in the message template.
 * @param destroyUsedKey - A boolean indicating whether to delete a key from the data object after it has been used in the replacement. Defaults to `false`.
 * @returns The formatted message with placeholders replaced by corresponding values from the data object.
 *
 * @example
 * // Example usage:
 * const template = "Hello, {{name}}! Welcome to {{location}}.";
 * const data = { name: "Alice", location: "Wonderland" };
 * const message = formatMessageTemplate(template, data);
 * console.log(message); // "Hello, Alice! Welcome to Wonderland."
 */
export function formatMessageTemplate(
  message: string,
  data: Record<string, any>,
  destroyUsedKey = false,
): string {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return message;
  }

  return message.replace(/{{(.+?)}}/g, (match, key) => {
    if (key in data) {
      const value = data[key];
      if (destroyUsedKey) {
        // eslint-disable-next-line no-param-reassign
        delete data[key];
      }
      return typeof value === 'string' ? value : safeStringify(value);
    }
    return match;
  });
}
