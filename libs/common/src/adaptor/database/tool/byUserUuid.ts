import isEmpty, { isNotEmpty } from '#common/shared/tool/isEmpty';

export const createdByUserUuid = (args: { value: Partial<{ createdByUserUuid: string }>; userUuid?: string }) => {
  if (isEmpty(args.value)) {
    return args.userUuid;
  }

  if ('createdByUserUuid' in args.value && isNotEmpty(args.value.createdByUserUuid)) {
    return args.value.createdByUserUuid;
  }

  return args.userUuid;
};

export const updatedByUserUuid = (args: {
  value: Partial<{ updatedByUserUuid: string; createdByUserUuid?: string }>;
  userUuid?: string;
}) => {
  if (isEmpty(args.value)) {
    return args.userUuid;
  }

  if ('updatedByUserUuid' in args.value && isNotEmpty(args.value.updatedByUserUuid)) {
    return args.value.updatedByUserUuid;
  }

  if ('createdByUserUuid' in args.value && isNotEmpty(args.value.createdByUserUuid)) {
    return args.value.createdByUserUuid;
  }

  return args.userUuid;
};
