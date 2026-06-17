import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import useThemeStore from '@stores/themeStore';

export const useTheme = () => {
  const { themeMode, isDark, setIsDark } = useThemeStore();
  const systemColorScheme = useColorScheme();
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>(
    isDark ? 'dark' : 'light'
  );

  useEffect(() => {
    if (themeMode === 'auto' && systemColorScheme) {
      setCurrentTheme(systemColorScheme);
      setIsDark(systemColorScheme === 'dark');
    } else if (themeMode === 'dark') {
      setCurrentTheme('dark');
      setIsDark(true);
    } else if (themeMode === 'light') {
      setCurrentTheme('light');
      setIsDark(false);
    }
  }, [themeMode, systemColorScheme, setIsDark]);

  return {
    isDark: currentTheme === 'dark',
    theme: currentTheme,
  };
};
