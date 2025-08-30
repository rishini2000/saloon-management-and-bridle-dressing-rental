import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { ConfigProvider } from 'antd';
import type { ThemeType } from '../config/themes';
import { getAntdTheme, themeConfigs } from '../config/themes';

interface ThemeContextType {
  currentTheme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  availableThemes: ThemeType[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('lavender');
  const availableThemes: ThemeType[] = ['dark', 'lavender', 'mint', 'peach', 'sky', 'rose'];

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('saloon-theme') as ThemeType;
    if (savedTheme && availableThemes.includes(savedTheme)) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  // Save theme to localStorage when it changes
  const setTheme = (theme: ThemeType) => {
    setCurrentTheme(theme);
    localStorage.setItem('saloon-theme', theme);
    
    // Update CSS custom properties for additional styling
    const config = themeConfigs[theme];
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', config.primaryColor);
    root.style.setProperty('--theme-background', config.backgroundColor);
    root.style.setProperty('--theme-surface', config.surfaceColor);
    root.style.setProperty('--theme-sider', config.siderColor);
    root.style.setProperty('--theme-border', config.borderColor);
    root.style.setProperty('--theme-text', config.textColor);
    root.style.setProperty('--theme-text-secondary', config.secondaryTextColor);
  };

  // Set initial CSS variables
  useEffect(() => {
    const config = themeConfigs[currentTheme];
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', config.primaryColor);
    root.style.setProperty('--theme-background', config.backgroundColor);
    root.style.setProperty('--theme-surface', config.surfaceColor);
    root.style.setProperty('--theme-sider', config.siderColor);
    root.style.setProperty('--theme-border', config.borderColor);
    root.style.setProperty('--theme-text', config.textColor);
    root.style.setProperty('--theme-text-secondary', config.secondaryTextColor);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, availableThemes }}>
      <ConfigProvider theme={getAntdTheme(currentTheme)}>
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};
