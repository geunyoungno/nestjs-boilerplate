import { CE_MASHUP } from '#common/shared/const-enum/CE_MASHUP';
import { type ControllerOptions } from '@nestjs/common';

export const getHost = (mashup: CE_MASHUP): ControllerOptions['host'] & RegExp => {
  if (mashup == CE_MASHUP.EXTERNAL) {
    return /^external-api(.*)$/;
  }

  if (mashup == CE_MASHUP.PLATFORM) {
    return /^platform-api(.*)$/;
  }

  // CE_MASHUP.COMMON 은 위의 host들에 대해서 요청이 가능하다.
  return /^(.*)$/;
};
