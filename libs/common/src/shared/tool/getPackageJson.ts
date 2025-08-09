import { type TPackageJson } from '#common/shared/dto/utility.type';
import packageJson from '../../../../../package.json';

const internalPackage: TPackageJson = packageJson;
const externalPackage: Readonly<TPackageJson> = internalPackage;

export function getPackageJson(): Readonly<TPackageJson> {
  return externalPackage;
}
