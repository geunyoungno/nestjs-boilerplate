import { type FastifyHelmetOptions } from '@fastify/helmet';

export const helmetOptions = {
  // @see https://github.com/nestjs/swagger/issues/932#issuecomment-693795372
  contentSecurityPolicy: {
    directives: {
      defaultSrc: [`'self'`],
      styleSrc: [`'self'`, `'unsafe-inline'`],
      imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
      scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
    },
  },
} satisfies FastifyHelmetOptions;
