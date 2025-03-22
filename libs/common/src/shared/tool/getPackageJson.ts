import { type PackageJson, type ReadonlyDeep } from 'type-fest';
import packageJson from '../../../../../package.json';

const internalPackage: PackageJson = packageJson;
const externalPackage: ReadonlyDeep<PackageJson> = internalPackage;

export function getPackageJson(): ReadonlyDeep<PackageJson> {
  return externalPackage;
}
