import { OpenAPIObject, SwaggerCustomOptions } from '@nestjs/swagger';

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
      name: 'health',
    },
  ],
  servers: [],
  components: {},
});

export const swaggerOptions: SwaggerCustomOptions = {};
