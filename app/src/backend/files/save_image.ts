import RNFS from 'react-native-fs';

export const saveImage = async (sourcePath: string, name: string): Promise<string> => {
  const destPath: string = `${RNFS.DocumentDirectoryPath}/${name}`;

  await RNFS.moveFile(sourcePath, destPath);
  return destPath;
};
