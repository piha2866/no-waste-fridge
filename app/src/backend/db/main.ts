import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';

const notesTable = 'notes';

enablePromise(true);

export const getDBConnection = async (): Promise<SQLiteDatabase> => {
  return openDatabase({ name: 'fridge.db', location: 'default' });
};

export const createTables = async (db: SQLiteDatabase): Promise<void> => {
  const createNotesTableQuery = `CREATE TABLE IF NOT EXISTS ${notesTable} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT DEFAULT "",
    opening_date TEXT NOT NULL,
    expiration_date TEXT NOT NULL,
    image_location TEXT
    );`;
  await db.executeSql(`DROP TABLE IF EXISTS ${notesTable};`);
  await db.executeSql(createNotesTableQuery);
  const openingDate = new Date('1-20-2020');
  const expirationDate = new Date('1-23-2020');
  await db.executeSql(`INSERT INTO ${notesTable} (title, description, opening_date, expiration_date) VALUES
    ('Groceries', 'Buy milk, eggs, and bread', '${openingDate}', '${expirationDate}'),
    ('Workout Plan', 'Monday: chest, Tuesday: back', '${openingDate}', '${expirationDate}'),
    ('Meeting Notes', 'Discuss project roadmap and milestones', '${openingDate}', '${expirationDate}'),
    ('Books to Read', 'The Great Gatsby, 1984, Brave New World', '${openingDate}', '${expirationDate}'),
    ('Ideas', 'App for tracking daily habits', '${openingDate}', '${expirationDate}');`);
};

export const initializeDB = async (): Promise<SQLiteDatabase> => {
  const db = await getDBConnection();
  await createTables(db);
  return db;
};
