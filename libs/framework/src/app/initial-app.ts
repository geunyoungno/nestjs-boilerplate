// 최상단에 두지 않으면 제대로 적용되지 않는다.
// config.dto.ts 등에서 TypeError: Reflect.getMetadata is not a function 오류가 발생하였다.
import 'reflect-metadata';

import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);
