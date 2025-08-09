import { FailureJsendDto, SuccessJsendDto } from '#common/shared/dto/res/jsend.dto';
import { type TClass, type TFirstArrayElement, type TMerge, type TSetRequired } from '#common/shared/dto/utility.type';
import { applyDecorators, type Type } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiUnauthorizedResponse,
  getSchemaPath,
  type ApiResponseOptions,
} from '@nestjs/swagger';
import { type ReferenceObject, type SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

/**
 * ApiResponse 를 Jsend 형식으로 반환한다
 * @param option 응답의 설정 옵션입니다.
 * @returns
 */
export const ApiJsend = <
  TRecordDto extends Record<string, Type<unknown> | Array<Type<unknown>> | Array<Array<Type<unknown>>>>,
  TApiResponse extends (options: ApiResponseOptions) => MethodDecorator & ClassDecorator = typeof ApiResponse,
>(
  option: TMerge<
    ApiResponseOptions,
    {
      type?: TRecordDto;
      apiResponse?: TApiResponse;
    }
  >,
  jsendDto: TClass<SuccessJsendDto<TRecordDto>> | TClass<FailureJsendDto<TRecordDto>> = SuccessJsendDto<TRecordDto>,
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
          extraModels: [ApiExtraModels(jsendDto)],
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
              const nestedDto = dtos.at(0);
              const dto = Array.isArray(nestedDto) === true ? nestedDto.at(0) : nestedDto;

              if (dto != null) {
                acc.extraModels.push(ApiExtraModels(jsendDto, dto));
                acc.properties[key] =
                  Array.isArray(nestedDto) === true
                    ? {
                        type: 'array',
                        items: {
                          type: 'array',
                          items: { $ref: getSchemaPath(dto) },
                        },
                      }
                    : {
                        type: 'array',
                        items: { $ref: getSchemaPath(dto) },
                      };
              }

              return acc;
            }

            // 배열이 아닐 경우
            const dto = dtos;
            acc.extraModels.push(ApiExtraModels(jsendDto, dto));
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
          { $ref: getSchemaPath(jsendDto) },
          jsendDto === SuccessJsendDto
            ? {
                properties: {
                  data: {
                    properties: data.properties,
                  },
                },
              }
            : {},
        ],
      },
    }),
  );
};

/**
 * OK 응답(200)에 대해 JsendDto 기반 Swagger 데코레이터를 제공합니다.
 * @param option - 정상적인 응답의 설정 옵션입니다.
 */
export const ApiOkJsend = (option: TSetRequired<TFirstArrayElement<Parameters<typeof ApiJsend>>, 'type'>) => {
  return ApiJsend(
    {
      ...option,
      apiResponse: ApiOkResponse,
    },
    SuccessJsendDto,
  );
};

/**
 * Created 응답(201)에 대해 JsendDto 기반 Swagger 데코레이터를 제공합니다.
 */
export const ApiCreatedJsend = (option: TSetRequired<TFirstArrayElement<Parameters<typeof ApiJsend>>, 'type'>) => {
  return ApiJsend(
    {
      ...option,
      apiResponse: ApiCreatedResponse,
    },
    SuccessJsendDto,
  );
};

/**
 * No Content 응답(204)에 대해 JsendDto 기반 Swagger 데코레이터를 제공합니다.
 */
export const ApiNoContentJsend = (option: TFirstArrayElement<Parameters<typeof ApiJsend>>) => {
  return ApiJsend(
    {
      ...option,
      apiResponse: ApiOkResponse,
    },
    SuccessJsendDto,
  );
};

/**
 * Bad Request 응답(400)
 * @param option
 * @returns
 */
export const ApiBadRequestJsend: typeof ApiJsend = (option) => {
  return ApiJsend(
    {
      ...option,
      apiResponse: ApiBadRequestResponse,
    },
    FailureJsendDto,
  );
};

/**
 * Unauthorized 응답(401)
 */
export const ApiUnAuthorizedJsend: typeof ApiJsend = (option) => {
  return ApiJsend(
    {
      ...option,
      apiResponse: ApiUnauthorizedResponse,
    },
    FailureJsendDto,
  );
};

/**
 * Not Found 응답(404)
 * @param option
 * @returns
 */
export const ApiNotFoundJsend: typeof ApiJsend = (option) => {
  return ApiJsend(
    {
      ...option,
      apiResponse: ApiNotFoundResponse,
    },
    FailureJsendDto,
  );
};

/**
 * Conflict 응답(409)
 */
export const ApiConflictJsend: typeof ApiJsend = (option) => {
  return ApiJsend(
    {
      ...option,
      apiResponse: ApiConflictResponse,
    },
    FailureJsendDto,
  );
};
