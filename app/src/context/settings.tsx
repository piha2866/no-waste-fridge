import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

const SETTINGS_KEY = 'app_settings';

type Settings = {
  darkMode: boolean;
  contentView: 'Grid' | 'List';
};

const defaultSettings: Settings = {
  darkMode: false,
  contentView: 'Grid',
};

const SettingsContext = createContext<SettingsHook | null>(null);

type SettingsProviderProps = {
  children: React.ReactNode;
};

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isReady, setIsReady] = useState(false);

  // Load settings once on app start
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const stored = await AsyncStorage.getItem(SETTINGS_KEY);
        if (stored) {
          setSettings(JSON.parse(stored));
        }
      } catch (e) {
        console.warn('Failed to load settings', e);
      } finally {
        setIsReady(true);
      }
    };

    void loadSettings();
  }, []);

  // Save helper
  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings((prev) => {
      const updated = { ...prev, [key]: value };

      // Persist inside state update to avoid stale closures
      void AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(updated)).catch((e) => {
        console.warn('Failed to save settings', e);
      });

      return updated;
    });
  };

  const value: SettingsHook = {
    settings,
    updateSetting,
    isReady,
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

// Custom hook (IMPORTANT)
type SettingsHook = {
  settings: Settings;
  updateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  isReady: boolean;
};

export const useSettings = (): SettingsHook => {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error('useSettings must be used inside SettingsProvider');
  }
  return ctx;
};
