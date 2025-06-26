import React, { createContext, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';
import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { getDBConnection } from '../backend/db/main';

type DatabaseContextType = {
  db: SQLiteDatabase;
};

export const DatabaseContext = createContext<DatabaseContextType>({ db: null });
export const useDatabase = () => useContext(DatabaseContext);

export const DatabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [db, setDb] = useState<SQLiteDatabase | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  const init = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const dbInstance = await getDBConnection();
      setDb(dbInstance);
    } catch (err) {
      console.error('DB open error:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    void init();
    return (): void => {
      void db?.close();
    };
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return (
      <View>
        <Text>Oops! Something went wrong with the database.</Text>
        <Button title="Retry" onPress={init} />
      </View>
    );
  }

  return <DatabaseContext.Provider value={{ db }}>{children}</DatabaseContext.Provider>;
};
