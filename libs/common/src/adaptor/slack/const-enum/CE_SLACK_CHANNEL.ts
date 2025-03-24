export const CE_SLACK_CHANNEL = {
  // SECTION - example
  EXAMPLE_LOCAL: '1234567890',
  EXAMPLE_PRODUCTION: '1234567890',
  // !SECTION
} as const;

export type CE_SLACK_CHANNEL = (typeof CE_SLACK_CHANNEL)[keyof typeof CE_SLACK_CHANNEL];
