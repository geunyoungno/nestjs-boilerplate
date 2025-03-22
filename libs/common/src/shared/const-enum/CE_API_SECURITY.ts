import { type ApiSecurity } from '@nestjs/swagger';

/**
 * 각 endpoint 별 보안 설정
 * * PUBLIC: 인증 없이 접근 가능한 API
 * * PROTECT: 인증이 필요한 API
 */
export const CE_API_SECURITY = {
  PUBLIC: {},
  PROTECT: { accessToken: [] },
} as const satisfies Record<string, Parameters<typeof ApiSecurity>[0]>;

export type CE_API_SECURITY = (typeof CE_API_SECURITY)[keyof typeof CE_API_SECURITY];
