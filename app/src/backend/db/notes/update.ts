import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Note } from '../../../types/note/note';
import { noteToDB } from '../../../types/note/transformer';
import { DBNote } from '../types';
import { selectNote } from './select';

export const updateNote = async (db: SQLiteDatabase, note: Note): Promise<Note> => {
  const { id, title, description, opening_date, expiration_date, image_location }: DBNote =
    noteToDB(note);
  const query = `Update notes set title = ?, description = ?, opening_date = ?, expiration_date = ?, image_location = ? where id = ?;`;
  const [res] = await db.executeSql(query, [
    title ?? null,
    description ?? null,
    opening_date ?? null,
    expiration_date ?? null,
    image_location,
    id,
  ]);
  if (res.rowsAffected === 0) throw Error('Note could not be updated.');
  return selectNote(db, id);
};
