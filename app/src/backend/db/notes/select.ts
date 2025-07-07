import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Note } from '../../../types/note/note';
import { noteFromDB } from '../../../types/note/transformer';
import { DBNote } from '../types';

export const selectNotes = async (
  db: SQLiteDatabase,
  sortBy: keyof DBNote = 'expiration_date',
  sortDir: 'asc' | 'desc' = 'asc',
): Promise<Note[]> => {
  const query = `Select * from notes order by ${sortBy} ${sortDir};`;
  const [data] = await db.executeSql(query);
  return data.rows.raw().map((dbNote: DBNote) => noteFromDB(dbNote));
};

export const selectNote = async (db: SQLiteDatabase, id: string | number): Promise<Note> => {
  const query = `Select * from notes where id = ?;`;
  const [data] = await db.executeSql(query, [id]);
  return noteFromDB(data.rows.item(0) as DBNote);
};
