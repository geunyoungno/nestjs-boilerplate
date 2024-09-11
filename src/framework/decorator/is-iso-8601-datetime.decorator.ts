import { applyDecorators } from '@nestjs/common';
import { Transform, type TransformFnParams } from 'class-transformer';
import {
  Validate,
  type ValidationArguments,
  ValidatorConstraint,
  type ValidatorConstraintInterface,
} from 'class-validator';

// class-validator 의 isISO8601 의 경우 date 정보만 있는 경우에도 통과를 시켜서 직접 정규식으로 구현하였다.
// @see https://regex101.com/r/76Cyr8/1
const iso8601Regex =
  /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T([01]\d|2[0-3]):([0-5]\d):([0-5]\d)(\.\d+)?([+-][01]\d:[0-5]\d|Z)$/;

export function IsISO8601Datetime() {
  return applyDecorators(
    /** 2. iso8601 검증 */
    Validate(IsISO8601Format),
    /** 1. 원본 값 전달 */
    Transform(({ value: _transformValue, obj, key }: TransformFnParams) => {
      const undefinedOriginValue = obj?.[key] ?? undefined;
      const originValue = typeof undefinedOriginValue === 'string' ? undefinedOriginValue : '';

      return originValue;
    }),
  );
}

@ValidatorConstraint({ name: 'isISO8601Format', async: false })
export class IsISO8601Format implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    // iso 8601 형식인지 검증
    if (iso8601Regex.test(value) === false) {
      return false;
    }

    // originValue 를 형변환 해서 입력
    // 이렇게 object의 값을 변경하면 순수한 함수가 아니게 되는데 방법이 안 찾아
    // 진다. decorator 는 아래 부터  실행될 텐데 class-transformer 의
    // decorator들이 호출 순서에 상관없이 class-validator 보다 먼저 실행된다.
    // 관련하여서는 좀 더 확인이 필요하다.
    if (args.object?.[args.property] != null) {
      args.object[args.property] = new Date(value);
    }

    return true;
  }

  defaultMessage(): string {
    return '$property must be a valid ISO 8601 datetime';
  }
}
