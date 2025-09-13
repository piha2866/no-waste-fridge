import RNFS from 'react-native-fs';
import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { imageDestPath } from '../files/config';
import { selectImageLocations } from './notes/select';

export const cleanupUnusedImages = async (db: SQLiteDatabase) => {
  try {
    const usedPaths = await selectImageLocations(db);
    const allFiles = await RNFS.readDir(imageDestPath);
    for (const file of allFiles) {
      if (!usedPaths.includes(file.path)) {
        await RNFS.unlink(file.path);
        console.log(`Deleted unused image: ${file.path}`);
      }
    }
  } catch (error) {
    console.error('Error cleaning images:', error);
  }
};
