import { type IAttributeEntity } from '#common/adaptor/database/entity/entity.type';

/**
 * `idOrder`에 따라 Entity 배열을 정렬하는 함수를 생성합니다.
 */
export const createSortById = (idOrder: Array<IAttributeEntity['id']>) => {
  const idIndexMap = new Map<IAttributeEntity['id'], number>();
  idOrder.forEach((id, index) => idIndexMap.set(id, index));

  return (left: { id: string }, right: { id: string }) => {
    const indexLeft = idIndexMap.get(left.id) ?? Infinity;
    const indexRight = idIndexMap.get(right.id) ?? Infinity;
    return indexLeft - indexRight;
  };
};
