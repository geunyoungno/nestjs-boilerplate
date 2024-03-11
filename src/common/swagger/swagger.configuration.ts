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

export const swaggerOptions: SwaggerCustomOptions = {};
