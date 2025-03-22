import { CommonModule } from '#common-api/common.module';
import { CE_COMMON } from '#common/shared/const-enum/CE_COMMON';
import { CE_CUSTOM_HEADER } from '#common/shared/const-enum/CE_CUSTOM_HEADER';
import { CE_MASHUP } from '#common/shared/const-enum/CE_MASHUP';
import { CE_RUN_MODE } from '#common/shared/const-enum/CE_RUN_MODE';
import { getHost } from '#common/shared/tool/getControllerHost';
import { getPackageJson } from '#common/shared/tool/getPackageJson';
import { isNotEmpty } from '#common/shared/tool/isEmpty';
import { ExternalModule } from '#external-api/external.module';
import { getRunMode } from '#framework/config/configuration';
import { PlatformModule } from '#platform-api/platform.module';
import {
  type OpenAPIObject,
  type SwaggerCustomOptions,
  type SwaggerDocumentOptions,
  type SwaggerModule,
} from '@nestjs/swagger';
import { type FastifyRequest } from 'fastify';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';
import { type Class } from 'type-fest';
import { type FirstArrayElement } from 'type-fest/source/internal';

const packageJson = getPackageJson();
const version = packageJson.version ?? '0.0.1';

const defaultSwaggerConfig: Omit<OpenAPIObject, 'info' | 'paths'> = {
  openapi: '3.0.0',
  security: [{ requestId: [], accessToken: [] }],
  components: {
    securitySchemes: {
      requestId: {
        description: 'Request 고유 ID, uuid v4 사용',
        in: 'header',
        name: `${CE_CUSTOM_HEADER.REQUEST_ID}`,
        type: 'apiKey',
      },
      accessToken: {
        description: '액세스 토큰',
        in: 'header',
        name: `${CE_CUSTOM_HEADER.ACCESS_TOKEN}`,
        type: 'apiKey',
      },
    },
  },
};

const defaultSwaggerOption = {
  explorer: true,
  // customSiteTitle: `trade-api swagger`,
  // jsonDocumentUrl: 'swagger.json',
  swaggerOptions: {
    filter: true,
    deepLinking: true,
    displayRequestDuration: true,
    displayOperationId: false,
    showExtensions: true,
  },
};

const getSwaggerServerUrl = (mashup: CE_MASHUP) => {
  const runMode = getRunMode();

  const url = [`${mashup}-api`, runMode, CE_COMMON.DOMAIN]
    .filter((str) => str !== CE_RUN_MODE.PRODUCTION) // 상용 환경에서는 runMode를 제외한다.
    .join('.');

  const protocol = runMode === CE_RUN_MODE.LOCAL ? 'http' : 'https';
  const port = runMode === CE_RUN_MODE.LOCAL ? 3001 : undefined;

  return `${protocol}://${[url, port].filter(isNotEmpty).join(':')}`;
};

/**
 * hostname과 swaggerName을 비교하여 일치하지 않으면 에러를 발생시킨다.
 */
const getPatchDocumentOnRequest = (mashup: CE_MASHUP) =>
  ((req, _res, document) => {
    const hostname = (req as FastifyRequest).hostname;

    if (getHost(mashup).test(hostname) === false) {
      throw new Error('Invalid hostname');
    }

    return document;
  }) satisfies SwaggerCustomOptions['patchDocumentOnRequest'];

export const operationIdFactory: SwaggerDocumentOptions['operationIdFactory'] = (
  controllerKey: string,
  methodKey: string,
  version?: string,
) => {
  return [version, controllerKey, methodKey].filter((str) => isNotEmpty(str)).join('-');
};

export const getSwaggerConfig = (args: {
  mashup: CE_MASHUP;
  description: string;
  include: Array<Class<unknown>>;
  option?: SwaggerCustomOptions;
}): {
  path: FirstArrayElement<Parameters<(typeof SwaggerModule)['setup']>>;
  config: Omit<OpenAPIObject, 'paths'>;
  option: SwaggerCustomOptions;
  documentOption: SwaggerDocumentOptions;
} => ({
  path: `${args.mashup}/swagger.io`,
  config: {
    ...defaultSwaggerConfig,
    info: {
      title: `${args.mashup}-api`,
      description: args.description,
      version,
    },
    tags: [{ name: 'health' }],
    servers: [{ url: getSwaggerServerUrl(args.mashup), description: args.description }],
  },
  option: {
    ...defaultSwaggerOption,
    customSiteTitle: `${args.mashup} swagger`,
    jsonDocumentUrl: `${args.mashup}/swagger.json`,
    patchDocumentOnRequest: getPatchDocumentOnRequest(args.mashup),
    ...args.option,
  },
  documentOption: {
    include: [...args.include, CommonModule],
    operationIdFactory,
  },
});

export const swaggerConfigRecord = {
  [CE_MASHUP.EXTERNAL]: getSwaggerConfig({
    mashup: CE_MASHUP.EXTERNAL,
    description: '외부 제공용 API',
    include: [ExternalModule],
    option: { customCss: new SwaggerTheme().getBuffer(SwaggerThemeNameEnum.CLASSIC) },
  }),
  [CE_MASHUP.PLATFORM]: getSwaggerConfig({
    mashup: CE_MASHUP.PLATFORM,
    description: '플랫폼 API',
    include: [PlatformModule],
    option: { customCss: new SwaggerTheme().getBuffer(SwaggerThemeNameEnum.FEELING_BLUE) },
  }),
} satisfies Record<Exclude<CE_MASHUP, typeof CE_MASHUP.COMMON>, ReturnType<typeof getSwaggerConfig>>;
