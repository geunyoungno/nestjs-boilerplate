import { type Class } from 'type-fest';

/**
 * 여러 부모 DTO를 병합하여 DTO를 초기화합니다.
 *
 * @param {Object} args - 인수 객체.
 * @param {ThisType<IDto>} args.thisDto - 초기화되는 DTO 인스턴스.
 * @param {Array<Class<Partial<IDto>>>} args.parentDtos - DTO를 초기화하는 데 사용되는 부모 DTO 클래스 배열.
 * @param {IEntity} args.domain - 부모 DTO를 인스턴스화 하는데 사용되는 Entity 객체.
 */
export const initDto = <IDto, IEntity>(args: {
  thisDto: ThisType<IDto>;
  parentDtos: Array<Class<Partial<IDto>>>;
  entity: IEntity;
}) => {
  const { thisDto, parentDtos, entity } = args;

  parentDtos
    .map((dto) => new dto(entity))
    .flatMap((dtoInstance) => Object.entries(dtoInstance))
    .forEach(([key, value]) => {
      thisDto[key] = value;
    });
};
