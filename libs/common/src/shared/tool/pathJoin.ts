import { type CE_MASHUP } from '#common/shared/const-enum/CE_MASHUP';

export const pathJoin = (paths: Array<string | CE_MASHUP>): string => {
  // 0번째 인덱스를 제거하고 join 한다.
  return paths.filter((_path, index) => index !== 0).join('/');
};
