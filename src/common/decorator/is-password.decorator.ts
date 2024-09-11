import { applyDecorators } from '@nestjs/common';
import {
  MaxLength,
  MinLength,
  Validate,
  ValidatorConstraint,
  type ValidationArguments,
  type ValidatorConstraintInterface,
} from 'class-validator';

/**
 * https://github.com/validatorjs/validator.js/blob/4197b8632522818164cc05d8d6cb44c98eb3decd/src/lib/isStrongPassword.js#L4-L7
 */
export const passwordRegex = {
  caseInsenstive: /[a-zA-Z]/,
  number: /[0-9]/,
  // eslint-disable-next-line no-useless-escape
  symbol: /[-#!$@£%^&*()_+|~=`{}\[\]:";'<>?,.\/]/,
};

// eslint-disable-next-line no-useless-escape
export const fullPasswordRegex = /^[a-zA-Z0-9\-#!$@£%^&*()_+|~=`{}\[\]:";'<>?,.\/ ]*$/;

export const isPasswordFormat = (value: string) => {
  /**
   * stage 1
   * 영문, 숫자, 특수 문자 이외에 정보가 들어가는지 검증
   * 들어가면 검증 실패
   */
  if (fullPasswordRegex.test(value) === false) {
    return false;
  }

  /**
   * 대소문자 구분 없는 영단어
   * 숫자
   * 특수문자
   *
   * 위 3가지 중 2개 이상 만족해야 된다
   */
  const satisfiedConditionLength = Object.values(passwordRegex).filter((condition) => condition.test(value)).length;

  return satisfiedConditionLength >= 2;
};

@ValidatorConstraint({ name: 'isPasswordFormat', async: false })
export class IsPasswordFormat implements ValidatorConstraintInterface {
  validate(value: string, _args: ValidationArguments) {
    return isPasswordFormat(value);
  }

  defaultMessage(): string {
    return '$property is not enough password';
  }
}

/**
 * 8글자 이상, 20글자 이하
 * 영문, 숫자, 특수문자 중 2종류 이상
 * @returns
 */
export function IsPassword() {
  return applyDecorators(
    //
    MinLength(8),
    MaxLength(20),
    Validate(IsPasswordFormat),
  );
}
