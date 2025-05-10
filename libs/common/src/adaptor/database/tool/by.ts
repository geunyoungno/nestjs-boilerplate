import isEmpty, { isNotEmpty } from '#common/shared/tool/isEmpty';

export const createdBy = (args: { value: Partial<{ createdBy: string }>; userUuid?: string }) => {
  if (isEmpty(args.value)) {
    return args.userUuid;
  }

  if ('createdBy' in args.value && isNotEmpty(args.value.createdBy)) {
    return args.value.createdBy;
  }

  return args.userUuid;
};

export const updatedBy = (args: { value: Partial<{ updatedBy: string; createdBy?: string }>; userUuid?: string }) => {
  if (isEmpty(args.value)) {
    return args.userUuid;
  }

  if ('updatedBy' in args.value && isNotEmpty(args.value.updatedBy)) {
    return args.value.updatedBy;
  }

  if ('createdBy' in args.value && isNotEmpty(args.value.createdBy)) {
    return args.value.createdBy;
  }

  return args.userUuid;
};
