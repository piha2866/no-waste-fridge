import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Note } from '../../../types/note/note';
import { noteFromDB } from '../../../types/note/transformer';
import { SortMode } from '../../../types/types';
import { DBNote } from '../types';

export interface QueryOptions {
  sortBy: keyof DBNote;
  sortDir: 'asc' | 'desc';
}

export const sortModesMatcher: Record<SortMode, QueryOptions> = {
  'A-Z': {
    sortBy: 'title',
    sortDir: 'asc',
  },
  'Z-A': {
    sortBy: 'title',
    sortDir: 'desc',
  },
  'Expiration Date': {
    sortBy: 'expiration_date',
    sortDir: 'asc',
  },
  'Opening Date': {
    sortBy: 'opening_date',
    sortDir: 'asc',
  },
};

export const selectNotes = async (
  db: SQLiteDatabase,
  { sortBy = 'expiration_date', sortDir = 'asc' }: QueryOptions,
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

export const selectImageLocations = async (db: SQLiteDatabase): Promise<string[]> => {
  const query = `Select distinct image_location from notes where image_location is not null;`;
  const [data] = await db.executeSql(query);
  return data.rows.raw().map((r) => r.image_location);
};
