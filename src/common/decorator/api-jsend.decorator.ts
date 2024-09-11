import { JsendDto } from '#common/dto/res/res-jsend.dto';
import { applyDecorators, type Type } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  getSchemaPath,
  type ApiResponseOptions,
} from '@nestjs/swagger';
import { type ReferenceObject, type SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { type Merge, type SetRequired } from 'type-fest';
import { type FirstArrayElement } from 'type-fest/source/internal';

/**
 * ApiResponse 를 Jsend 형식으로 반환한다
 * @param option 응답의 설정 옵션입니다.
 * @returns
 */
export const ApiJsend = <
  TRecordDto extends Record<string, Type<unknown> | Array<Type<unknown>>>,
  TApiResponse extends (options: ApiResponseOptions) => MethodDecorator & ClassDecorator,
>(
  option: Merge<
    FirstArrayElement<Parameters<TApiResponse>>,
    {
      type?: TRecordDto;
      apiResponse?: TApiResponse;
    }
  >,
) => {
  const { type, apiResponse: undefinedApiResponse, ...restOption } = option;
  const apiResponse = undefinedApiResponse ?? ApiResponse;

  // 데이터 속성 및 추가 모델을 추적하기 위한 누산기 객체를 초기화합니다.
  const data: {
    extraModels: Array<ReturnType<typeof ApiExtraModels>>;
    properties: Record<string, SchemaObject | ReferenceObject> | undefined;
  } =
    type == null
      ? {
          extraModels: [ApiExtraModels(JsendDto)],
          properties: undefined,
        }
      : Object.entries(type).reduce<{
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
    apiResponse({
      ...restOption,
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

/**
 * OK 응답(200)에 대해 JsendDto 기반 Swagger 데코레이터를 제공합니다.
 * @param option - 정상적인 응답의 설정 옵션입니다.
 */
export const ApiOkJsend = (option: SetRequired<FirstArrayElement<Parameters<typeof ApiJsend>>, 'type'>) => {
  return ApiJsend({
    ...option,
    apiResponse: ApiOkResponse,
  });
};

/**
 * Bad Request 응답(400)
 * * class-validaor의 오류 등
```
{
  "data": [
    "userUuid must be a UUID"
  ],
  "code": "Bad Request"
}
```
 * @param option
 * @returns
 */
export const ApiBadRequestJsend: typeof ApiJsend = (option) => {
  return ApiJsend({
    ...option,
    apiResponse: ApiBadRequestResponse,
  });
};

/**
 * Not Found 응답(404)
 * * 서버에서 조회 하지 못했을 경우 등
```
{
  "code": "NotFoundException",
  "message": "user not found"
}
```
 * @param option
 * @returns
 */
export const ApiNotFoundJsend: typeof ApiJsend = (option) => {
  return ApiJsend({
    ...option,
    apiResponse: ApiNotFoundResponse,
  });
};
