import { type ILogFormat } from '#framework/logger/log-format.type';

export default function getHttpMethod(method?: string): ILogFormat['req_method'] {
  if (method === undefined || method === null) {
    return 'UNKNOWN';
  }

  const upperCased = method.toUpperCase();

  if (upperCased === 'GET') {
    return 'GET';
  }

  if (upperCased === 'POST') {
    return 'POST';
  }

  if (upperCased === 'PUT') {
    return 'PUT';
  }

  if (upperCased === 'DELETE') {
    return 'DELETE';
  }

  if (upperCased === 'HEAD') {
    return 'HEAD';
  }

  if (upperCased === 'PATCH') {
    return 'PATCH';
  }

  if (upperCased === 'OPTIONS') {
    return 'OPTIONS';
  }

  if (upperCased === 'TRACE') {
    return 'TRACE';
  }

  return 'UNKNOWN';
}
