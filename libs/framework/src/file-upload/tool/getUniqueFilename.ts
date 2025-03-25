import { randomBytes as cryptoRandomBytes } from 'crypto';
import { extname } from 'path';
import { promisify } from 'util';

export const randomBytes = promisify(cryptoRandomBytes);

export const getUniqueFilename = async (filename: string) => {
  const buffer = await randomBytes(16);
  const ext = extname(filename); // 확장자 추출

  return `${buffer.toString('hex')}${ext}`;
};
