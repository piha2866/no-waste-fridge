import { SQLiteDatabase } from 'react-native-sqlite-storage';

export const deleteNote = async (db: SQLiteDatabase, id: number) => {
  const query = `Delete from notes where id = ${id};`;
  const [res] = await db.executeSql(query);
  if ((res.rowsAffected = 0)) throw Error('Entry could not be deleted.');
};
