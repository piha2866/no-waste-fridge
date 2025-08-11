import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';

const tableName = 'notes';

enablePromise(true);

export const getDBConnection = async (): Promise<SQLiteDatabase> => {
  return openDatabase({ name: 'fridge.db', location: 'default' });
};

export const createTable = async (db: SQLiteDatabase): Promise<void> => {
  const query = `CREATE TABLE IF NOT EXISTS ${tableName} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    opening_date TEXT NOT NULL,
    expiration_date TEXT NOT NULL
    );`;
  await db.executeSql(`DROP TABLE IF EXISTS ${tableName};`);
  await db.executeSql(query);
  const openingDate = new Date('1-20-2020');
  const expirationDate = new Date('1-23-2020');
  await db.executeSql(`INSERT INTO ${tableName} (title, description, opening_date, expiration_date) VALUES
    ('Groceries', 'Buy milk, eggs, and bread', '${openingDate}', '${expirationDate}'),
    ('Workout Plan', 'Monday: chest, Tuesday: back', '${openingDate}', '${expirationDate}'),
    ('Meeting Notes', 'Discuss project roadmap and milestones', '${openingDate}', '${expirationDate}'),
    ('Books to Read', 'The Great Gatsby, 1984, Brave New World', '${openingDate}', '${expirationDate}'),
    ('Ideas', 'App for tracking daily habits', '${openingDate}', '${expirationDate}');`);
};

export const initializeDB = async (): Promise<SQLiteDatabase> => {
  const db = await getDBConnection();
  await createTable(db);
  return db;
};
