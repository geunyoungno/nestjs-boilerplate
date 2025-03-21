import { escape } from '#common/shared/tool/escape';
import fastSafeStringify from 'fast-safe-stringify';

export default function escapeStringify<T>(
  data: T,
  stringify?: (
    value: unknown,
    replacer?: Parameters<typeof fastSafeStringify>[1],
    space?: Parameters<typeof fastSafeStringify>[2],
    option?: Parameters<typeof fastSafeStringify>[3],
  ) => string,
  replacer?: Parameters<typeof fastSafeStringify>[1],
  space?: Parameters<typeof fastSafeStringify>[2],
  option?: Parameters<typeof fastSafeStringify>[3],
): string {
  try {
    return escape(
      (stringify ?? fastSafeStringify)(
        data,
        replacer ??
          // @see https://github.com/davidmarkclements/fast-safe-stringify/pull/48#issue-553920254
          // bigint 지원
          function (key, value) {
            replacer =
              replacer !== undefined
                ? replacer
                : function (_k, v) {
                    return v;
                  };
            return replacer(key, typeof value === 'bigint' ? value.toString() : value);
          },
        space,
        option,
      ),
    );
  } catch {
    return '{}';
  }
}
