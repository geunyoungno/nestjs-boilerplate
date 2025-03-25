import fs from 'fs';

export const pathExists = async (path: string) => {
  try {
    await fs.promises.access(path);
    return true;
  } catch (_catched) {
    return false;
  }
};
