import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { NewNote, Note } from '../../../types/note/note';
import { newNoteToDB } from '../../../types/note/transformer';
import { DBNewNote } from '../types';
import { selectNote } from './select';

export const insertNote = async (db: SQLiteDatabase, newNote: NewNote): Promise<Note> => {
  const { title, description, opening_date, expiration_date, image_location }: DBNewNote =
    newNoteToDB(newNote);
  const query = `Insert into notes (title, description, opening_date, expiration_date, image_location) values (?,?,?,?,?);`;
  const [res] = await db.executeSql(query, [
    title ?? '',
    description ?? '',
    opening_date ?? new Date(),
    expiration_date ?? new Date(),
    image_location,
  ]);
  if (res.rowsAffected === 0 || !res.insertId) throw Error('Note could not be inserted.');
  return selectNote(db, res.insertId);
};
