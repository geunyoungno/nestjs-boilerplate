import { getConfigInDto } from '#framework/config/configuration';

/**
 * NOTE: DTO 에서만 사용함
 * storagePath를 url로 변환하기
 */
export function storagePathToUrl(args: { storagePath?: string }) {
  const cdnUrl = getConfigInDto().endpoint.cdn.url ?? undefined;

  const storagePathWithoutCdn = args.storagePath?.replace('cdn/', '');

  if (cdnUrl == null || storagePathWithoutCdn == null) {
    return '';
  }

  return [cdnUrl, storagePathWithoutCdn].join('/');
}
