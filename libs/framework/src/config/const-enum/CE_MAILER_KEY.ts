/**
 * 메일러 키
 * * AWS_SES, aws_ses: AWS SES
 */
export const CE_MAILER_KEY = {
  AWS_SES: 'aws_ses',
} as const satisfies Record<string, string>;

export type CE_MAILER_KEY = (typeof CE_MAILER_KEY)[keyof typeof CE_MAILER_KEY];
