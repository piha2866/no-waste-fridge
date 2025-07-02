import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Note } from '../types';
import { selectNote } from './select';

export const insertNote = async (
  db: SQLiteDatabase,
  { title, description, opening_date, expiration_date }: Omit<Note, 'id'>,
): Promise<Note> => {
  const query = `Insert into notes (title, description, opening_date, expiration_date) values (?,?,?,?);`;
  const [res] = await db.executeSql(query, [
    title ?? '',
    description ?? '',
    opening_date ?? new Date(),
    expiration_date ?? new Date(),
  ]);
  if (res.rowsAffected === 0 || !res.insertId) throw Error('Note could not be inserted.');
  return selectNote(db, res.insertId);
};
