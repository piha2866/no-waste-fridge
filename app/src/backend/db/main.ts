import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';

const tableName = 'notes';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({ name: 'fridge.db', location: 'default' });
};

export const createTable = async (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS ${tableName} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    opening_date TEXT NOT NULL,
    expiration_date TEXT NOT NULL
    );`;
    await db.executeSql(`DROP TABLE IF EXISTS ${tableName};`)
  await db.executeSql(query);
    await db.executeSql(`INSERT INTO ${tableName} (title, description, opening_date, expiration_date) VALUES
    ('Groceries', 'Buy milk, eggs, and bread', '${new Date()}', '${new Date()}'),
    ('Workout Plan', 'Monday: chest, Tuesday: back', '${new Date()}', '${new Date()}'),
    ('Meeting Notes', 'Discuss project roadmap and milestones', '${new Date()}', '${new Date()}'),
    ('Books to Read', 'The Great Gatsby, 1984, Brave New World', '${new Date()}', '${new Date()}'),
    ('Ideas', 'App for tracking daily habits', '${new Date()}', '${new Date()}');`)
};

export const initializeDB = async (): Promise<SQLiteDatabase> => {
    const db = await getDBConnection();
    await createTable(db);
    return db;
}