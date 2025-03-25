export interface IRedisConfig {
  /** redis host */
  host: string;

  /** redis port */
  port: number;

  /** redis db */
  db: Record<'cache' | 'queue', number>;

  /** redis ttl, millisecond 단위 */
  ttl?: number;

  /** tls 사용 여부 */
  tls?: boolean;
}
