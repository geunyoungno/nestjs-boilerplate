import { type TClass, type TFirstArrayElement } from '#common/shared/dto/utility.type';
import { RouteConstraints } from '@nestjs/platform-fastify';

/**
 * class의 모든 method에 decorator를 적용한다.
 * @see https://stackoverflow.com/a/74898678
 */
export function AllMethod(decorator: MethodDecorator) {
  return (target: TClass<unknown>) => {
    const descriptors = Object.getOwnPropertyDescriptors(target.prototype);
    for (const [propName, descriptor] of Object.entries(descriptors)) {
      const isMethod = typeof descriptor.value == 'function' && propName != 'constructor';
      if (!isMethod) {
        continue;
      }
      decorator(target, propName, descriptor);
      Object.defineProperty(target.prototype, propName, descriptor);
    }
  };
}

/**
 * controller의 모든 method에 RouteConstraints 데코레이터를 적용한다.
 */
export function AllMethodRouteConstraints(config: TFirstArrayElement<Parameters<typeof RouteConstraints>>) {
  return AllMethod(RouteConstraints(config));
}
