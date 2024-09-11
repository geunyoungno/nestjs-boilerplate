import { RouteConstraints } from '@nestjs/platform-fastify';
import { type Class } from 'type-fest';
import { type FirstArrayElement } from 'type-fest/source/internal';

/**
 * class의 모든 method에 decorator를 적용한다.
 * @see https://stackoverflow.com/a/74898678
 */
export function AllMethod(decorator: MethodDecorator) {
  return (target: Class<unknown>) => {
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
export function AllMethodRouteConstraints(config: FirstArrayElement<Parameters<typeof RouteConstraints>>) {
  return AllMethod(RouteConstraints(config));
}
