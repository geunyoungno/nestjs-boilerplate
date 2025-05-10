import { type IAttributeEntity } from '#common/adaptor/database/entity/entity.type';
import { type TDraft } from '#common/adaptor/database/repository/abstract.repository.type';
import * as uuid from 'uuid';

export const draftAttribute: TDraft<IAttributeEntity> = (args) => {
  const now = args?.extra?.now ?? new Date();

  return {
    uuid: args?.uuid ?? uuid.v4(),

    createdAt: args?.createdAt ?? now,
    updatedAt: args?.updatedAt ?? now,
    deletedAt: args?.deletedAt ?? null,
    isDeleted: args?.isDeleted ?? false,
    createdBy: args?.createdBy ?? '',
    updatedBy: args?.updatedBy ?? '',
    deletedBy: args?.deletedBy ?? null,
  };
};
