import RNFS from 'react-native-fs';

import { imageDestPath } from './config';

export const saveImage = async (sourcePath: string, name: string): Promise<string> => {
  const newImgPath = `${imageDestPath}/${name}`;
  const exists = await RNFS.exists(imageDestPath);
  if (!exists) {
    await RNFS.mkdir(imageDestPath);
  }
  await RNFS.moveFile(sourcePath, newImgPath);
  return newImgPath;
};
