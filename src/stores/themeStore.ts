import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeMode = 'light' | 'dark' | 'auto';

interface ThemeState {
  themeMode: ThemeMode;
  isDark: boolean;

  setThemeMode: (mode: ThemeMode) => void;
  setIsDark: (isDark: boolean) => void;
}

const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      themeMode: 'auto',
      isDark: false,

      setThemeMode: (mode) => {
        set({ themeMode: mode });
      },

      setIsDark: (isDark) => {
        set({ isDark });
      },
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useThemeStore;
