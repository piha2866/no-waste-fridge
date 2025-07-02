import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Note } from '../types';

export const selectNotes = async (
  db: SQLiteDatabase,
  sortBy: keyof Note = 'expiration_date',
  sortDir: 'asc' | 'desc' = 'asc',
): Promise<Note[]> => {
  const query = `Select * from notes order by ${sortBy} ${sortDir};`;
  const [data] = await db.executeSql(query);
  return data.rows.raw() as Note[];
};

export const selectNote = async (db: SQLiteDatabase, id: string | number): Promise<Note> => {
  const query = `Select * from notes where id = ?;`;
  const [data] = await db.executeSql(query, [id]);
  return data.rows.item(0) as Note;
};
