import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { createTable, getDBConnection } from './main';

// describe('getDBConnection()', () => {
//   it('should return a valid SQLiteDatabase instance', async () => {
//     console.log('INNNNN');
//     const connection = await getDBConnection();
//     console.log('CONNN', connection);
//     expect(connection).toBeDefined();
//     expect(typeof connection.executeSql).toBe('function');
//   });
// });

describe('Database initialization', () => {
  let db: SQLiteDatabase;
  const tableName = 'notes';

  beforeAll(async () => {
    db = await getDBConnection();
  });

  afterAll(async () => {
    await db.close();
  });

  describe('createTable()', () => {
    it('should create the table and insert default data', async () => {
      await createTable(db);
      const [results] = await db.executeSql(`SELECT * FROM ${tableName}`);
      expect(results.rows).toHaveLength(5); // 5 rows from insert
    });
  });
});
