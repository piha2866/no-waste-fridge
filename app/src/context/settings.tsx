import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

const SETTINGS_KEY = 'app_settings';

const defaultSettings = {
  darkMode: false,
  contentView: 'Grid',
};

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);
  const [isReady, setIsReady] = useState(false);

  // Load settings once on app start
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const stored = await AsyncStorage.getItem(SETTINGS_KEY);
        console.log('STORED STUFF', stored);
        if (stored) {
          console.log('setting stored settings');
          setSettings(JSON.parse(stored));
        }
      } catch (e) {
        console.warn('Failed to load settings', e);
      } finally {
        console.log('READY');
        setIsReady(true);
      }
    };

    void loadSettings();
  }, []);

  // Save helper
  const updateSetting = async (key: string, value: string | number) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);

    try {
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save settings', e);
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSetting,
        isReady,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

// Custom hook (IMPORTANT)
export const useSettings = () => {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error('useSettings must be used inside SettingsProvider');
  }
  return ctx;
};
