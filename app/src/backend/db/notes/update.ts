import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Note } from '../types';
import { selectNote } from './select';

export const updateNote = async (
  db: SQLiteDatabase,
  { title, description, opening_date, expiration_date, id }: Note,
): Promise<Note> => {
  const query = `Update notes set title = ?, description = ?, opening_date = ?, expiration_date = ? where id = ?;`;
  const [res] = await db.executeSql(query, [
    title ?? null,
    description ?? null,
    opening_date ?? null,
    expiration_date ?? null,
    id,
  ]);
  if (res.rowsAffected === 0) throw Error('Note could not be updated.');
  return selectNote(db, id);
};
