import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';

const tableName = 'notes';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({ name: 'fridge.db', location: 'default' });
};

export const createTable = async (db: SQLiteDatabase) => {
    console.log("A")
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName} (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);`;
    await db.executeSql(`DROP TABLE IF EXISTS ${tableName};`)
  await db.executeSql(query);
  console.log("ININ")
  try {
  await db.executeSql(`INSERT INTO ${tableName} (title, content) VALUES
  ('Groceries', 'Buy milk, eggs, and bread'),
  ('Workout Plan', 'Monday: chest, Tuesday: back'),
  ('Meeting Notes', 'Discuss project roadmap and milestones'),
  ('Books to Read', 'The Great Gatsby, 1984, Brave New World'),
  ('Ideas', 'App for tracking daily habits');`)
  } catch (error) {
    console.log("EERR", error)
  }
  console.log("INSERTED")
};

export const getNotes = async (db: SQLiteDatabase) => {
    const [data] = await db.executeSql(`Select * from ${tableName}`)
    console.log(data)
    console.log(data.rows.item(0))
    return data;
}

export const initializeDB = async () => {
    console.log("in func")
    const db = await getDBConnection();
    console.log("got db")
    await createTable(db);
    console.log("created table")
    const data = await getNotes(db);
    console.log("NOTESS", data)
    return db;
}