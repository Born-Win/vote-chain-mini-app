import safeStringify from 'fast-safe-stringify';

import { Logger as NestLogger } from '@nestjs/common';

import { formatMessageTemplate, pickError } from '@common/utils';

export class Logger extends NestLogger {
  /**
   * Formats a message by replacing placeholders with corresponding values from the meta object.
   * Appends the meta data as a stringified JSON object if it's not empty.
   * Removes used keys from the meta object.
   *
   * @param message - The message template containing placeholders in the format `{{key}}`.
   * @param meta - An optional object containing additional meta data to be included in the message.
   * @returns The formatted message with placeholders replaced and meta data appended, if provided.
   *
   * @example
   * // Example usage:
   * const message = "User {{username}} has logged in.";
   * const meta = { username: "Alice", ip: "127.0.0.1" };
   * const result = formatMessageWithMeta(message, meta);
   * console.log(result); // "User Alice has logged in. - Meta: {"ip":"127.0.0.1"}"
   */
  private formatMessageWithMeta(message: string, meta?: any): string {
    if (meta && typeof meta === 'object') {
      const formattedMessage = !Array.isArray(meta)
        ? formatMessageTemplate(message, meta, true)
        : message;

      const stringifiedMeta = safeStringify(meta);
      if (!['{}', '[]'].includes(stringifiedMeta)) {
        return `${formattedMessage} - Meta: ${stringifiedMeta}`;
      }

      return formattedMessage;
    }
    return message;
  }

  private logWithMeta(
    level: 'error' | 'warn' | 'log' | 'verbose' | 'debug',// export type LogLevel = 'log' | 'error' | 'warn' | 'debug' | 'verbose' | 'fatal';
    message: string,
    meta?: any,
    stack?: string,
  ): void {
    const formattedMessage = this.formatMessageWithMeta(message, meta);
    if (level === 'error' && stack) {
      super[level](formattedMessage, stack);
      return;
    }
    super[level](formattedMessage);
  }

  error(message: string, meta?: any): void {
    if (meta?.error instanceof Error) {
      const { error, ...otherMeta } = meta;
      const { stack } = error;
      delete error.stack;
      otherMeta.error = pickError(error);
      this.logWithMeta('error', message, otherMeta, stack);
    } else {
      this.logWithMeta('error', message, meta);
    }
  }

  warn(message: string, meta?: any): void {
    this.logWithMeta('warn', message, meta);
  }

  log(message: string, meta?: any): void {
    this.logWithMeta('log', message, meta);
  }

  verbose(message: string, meta?: any): void {
    this.logWithMeta('verbose', message, meta);
  }

  debug(message: string, meta?: any): void {
    this.logWithMeta('debug', message, meta);
  }
}
