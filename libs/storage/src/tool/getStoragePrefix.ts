export const getStoragePrefix = (args: { imageUuid: string }) => {
  const origin = ['cdn', 'upload', 'image', `${args.imageUuid}`].join('/');

  return {
    origin,
    thumbnail: [origin, 'thumbnail'].join('/'),
    thumbnailPath: [origin, 'thumbnail', `${args.imageUuid}.webp`].join('/'),
  };
};
