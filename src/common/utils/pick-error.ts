const primitives = ['string', 'number', 'symbol', 'boolean'];

class AnyObject {
  [key: string]: Exclude<any, (...args: any) => any>;
}

function isPrimitive(
  input: AnyObject | string | number | boolean | symbol,
): input is string | number | boolean | symbol {
  return primitives.includes(typeof input);
}

function reduceErrorValue(
  input: AnyObject | string | number | boolean | symbol,
): AnyObject | string | number | boolean | symbol {
  if (isPrimitive(input)) {
    return input;
  }

  return Object.getOwnPropertyNames(input).reduce<Record<string, string>>(
    (acc, key) => {
      const val = input[key];

      const type = typeof val;

      if (type === 'function') {
        return acc;
      }

      if (Array.isArray(val)) {
        return Object.assign(acc, {
          [key]: val.map(arrayVal => reduceErrorValue(arrayVal)),
        });
      }

      if (!val) {
        return Object.assign(acc, { [key]: val });
      }

      if (type === 'object') {
        return Object.assign(acc, { [key]: reduceErrorValue(val) });
      }

      return Object.assign(acc, { [key]: val });
    },
    {},
  );
}

export function pickError(e: any): AnyObject {
  const error = reduceErrorValue(e) as AnyObject;

  // "message" and "msg" are properties bound by our logger/exception filter
  // if (error.message) {
  //   error.nativeMessage = error.message;
  //   delete error.message;
  // }
  //
  // if (error.msg) {
  //   error.nativeMsg = error.msg;
  //   delete error.msg;
  // }

  return error;
}
