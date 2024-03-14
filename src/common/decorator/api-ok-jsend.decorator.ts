import { JsendDto } from '#nestjs-common/common/dto/res/res-jsend.dto';
import { applyDecorators, type Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { type ReferenceObject, type SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { type LastArrayElement, type Merge } from 'type-fest';

/**
 * OK 응답에 대해 JsendDto 기반 Swagger 데코레이터를 제공합니다.
 * @param okOptions - 정상적인 응답의 설정 옵션입니다.
 */
export const ApiOkJsend = <TRecordDto extends Record<string, Type<unknown> | Array<Type<unknown>>>>(
  okOptions: Merge<
    LastArrayElement<Parameters<typeof ApiOkResponse>>,
    {
      type: TRecordDto;
    }
  >,
) => {
  const { type, ...options } = okOptions;

  // 데이터 속성 및 추가 모델을 추적하기 위한 누산기 객체를 초기화합니다.
  const data = Object.entries(type).reduce<{
    extraModels: Array<ReturnType<typeof ApiExtraModels>>;
    properties: Record<string, SchemaObject | ReferenceObject>;
  }>(
    (acc, [key, dtos]) => {
      // 이미 있는 속성이면, 넘어갑니다.
      if (acc.properties[key] != null) {
        return acc;
      }

      // 배열 일 경우
      if (Array.isArray(dtos) === true) {
        const dto = dtos.at(0);

        if (dto != null) {
          acc.extraModels.push(ApiExtraModels(JsendDto, dto));
          acc.properties[key] = {
            type: 'array',
            items: { $ref: getSchemaPath(dto) },
          };
        }

        return acc;
      }

      // 배열이 아닐 경우
      const dto = dtos;
      acc.extraModels.push(ApiExtraModels(JsendDto, dto));
      acc.properties[key] = {
        $ref: getSchemaPath(dto),
      };

      return acc;
    },
    {
      extraModels: [],
      properties: {},
    },
  );

  // 생성된 추가 모델 및 응답 스키마를 데코레이터로 반환
  return applyDecorators(
    ...data.extraModels,
    ApiOkResponse({
      ...options,
      schema: {
        // 기본적인 JsendDto 스키마와 데이터 속성을 합친 응답 스키마를 생성
        allOf: [
          { $ref: getSchemaPath(JsendDto) },
          {
            properties: {
              data: {
                properties: data.properties,
              },
            },
          },
        ],
      },
    }),
  );
};
