/**
 * 로그는 [syslog](https://en.wikipedia.org/wiki/Syslog)의 내용을 따른다.
 * 그러나 실제 위 상황을 다 지키기 어려워 다음과 같이 사용한다.
 * emerg, alert, crit 는 하나로 본다. 셋을 구분하지 않고 crit로만 처리한다.
 * warn, notice는 하나로 본다. 둘을 구분하지 않고 warn으로 처리한다.
 *
 * crit, error, warn, info, debug 5가지 레벨만 사용한다.
 */
/**
 * * emerg, 0
 * * alert: 1
 * * crit, 2: 치명적 오류, 즉각 대응 필요
 * * err, 3: 오류, 즉각 대응이 필요하지 않은 수준 -> 이미 오류 발생했음
 * * warning, 4: 경고, 즉각 대응이 필요하지 않지만 대응이 필요한 수준 -> 오류 발생은 안했지만 뭔가 문제가 있어보임 (속도가 아주 느려졌다던가, 캐시 시스템 접속이 불가하다던가)
 * * notice, 5
 * * info: 6: 정보, 각종 성공 등
 * * debug: 7: 디버그 정보
 */
export const CE_LOG_LEVEL = {
  emerg: 0,
  alert: 1,
  crit: 2,
  err: 3,
  warning: 4,
  notice: 5,
  info: 6,
  debug: 7,
} as const;

export const CE_LOG_COLOR = {
  emerg: 'red',
  alert: 'red',
  crit: 'red',
  err: 'magenta',
  warning: 'cyan',
  notice: 'cyan',
  info: 'green',
  debug: 'yellow',
} as const;

export type CE_LOG_LEVEL_KEY = keyof typeof CE_LOG_LEVEL;
