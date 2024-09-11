import { type OpenAPIObject, type SwaggerCustomOptions } from '@nestjs/swagger';

export default (): Omit<OpenAPIObject, 'paths'> => ({
  openapi: '3.0.0',
  info: {
    title: 'nestjs-boilerplate',
    description: '',
    version: '1.0.0',
    contact: {},
  },
  tags: [
    {
      name: 'healths',
    },
    { name: 'users' },
  ],
  servers: [
    // {
    //   url: 'http://localhost:3001/',
    // },
  ],
  security: [{ 'x-request-id': [] }],
  components: {
    securitySchemes: {
      'x-request-id': {
        type: 'apiKey',
        description: 'Request 고유 ID, uuid v4 사용',
        name: 'x-request-id',
        in: 'header',
      },
    },
  },
});

export const swaggerCustomOptions = {
  // explorer: true,
  customSiteTitle: `nestjs-boilerplate swagger`,
  jsonDocumentUrl: 'swagger.json',
  swaggerOptions: {
    filter: true,
    deepLinking: true,
    displayRequestDuration: true,
    displayOperationId: false,
    showExtensions: true,
  },
} satisfies SwaggerCustomOptions;
