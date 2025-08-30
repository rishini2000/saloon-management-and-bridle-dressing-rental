import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { ConfigProvider } from 'antd';
import type { ColorTheme, ThemeMode } from '../config/themes';
import { getAntdTheme, getThemeConfig, colorThemes } from '../config/themes';

interface ThemeContextType {
  currentColorTheme: ColorTheme;
  currentMode: ThemeMode;
  effectiveMode: 'light' | 'dark'; // The actual mode being used (resolved from auto)
  setColorTheme: (theme: ColorTheme) => void;
  setMode: (mode: ThemeMode) => void;
  availableColorThemes: ColorTheme[];
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
  const [currentColorTheme, setCurrentColorTheme] = useState<ColorTheme>('lavender');
  const [currentMode, setCurrentMode] = useState<ThemeMode>('auto');
  const [effectiveMode, setEffectiveMode] = useState<'light' | 'dark'>('light');
  const availableColorThemes: ColorTheme[] = ['lavender', 'mint', 'peach', 'sky', 'rose'];

  // Detect system preference
  const getSystemPreference = (): 'light' | 'dark' => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  };

  // Update effective mode based on current mode
  useEffect(() => {
    if (currentMode === 'auto') {
      setEffectiveMode(getSystemPreference());
    } else {
      setEffectiveMode(currentMode);
    }
  }, [currentMode]);

  // Listen for system preference changes when in auto mode
  useEffect(() => {
    if (currentMode === 'auto' && typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        setEffectiveMode(e.matches ? 'dark' : 'light');
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [currentMode]);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedColorTheme = localStorage.getItem('saloon-color-theme') as ColorTheme;
    const savedMode = localStorage.getItem('saloon-theme-mode') as ThemeMode;
    
    if (savedColorTheme && availableColorThemes.includes(savedColorTheme)) {
      setCurrentColorTheme(savedColorTheme);
    }
    if (savedMode && (savedMode === 'light' || savedMode === 'dark' || savedMode === 'auto')) {
      setCurrentMode(savedMode);
    }
  }, []);

  // Save color theme to localStorage when it changes
  const setColorTheme = (theme: ColorTheme) => {
    setCurrentColorTheme(theme);
    localStorage.setItem('saloon-color-theme', theme);
  };

  // Save mode to localStorage when it changes
  const setMode = (mode: ThemeMode) => {
    setCurrentMode(mode);
    localStorage.setItem('saloon-theme-mode', mode);
  };

  // Update CSS custom properties for additional styling
  const updateCSSVariables = (colorTheme: ColorTheme, resolvedMode: 'light' | 'dark') => {
    const config = getThemeConfig(colorTheme, resolvedMode);
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
    updateCSSVariables(currentColorTheme, effectiveMode);
  }, [currentColorTheme, effectiveMode]);

  return (
    <ThemeContext.Provider value={{ 
      currentColorTheme, 
      currentMode,
      effectiveMode,
      setColorTheme, 
      setMode, 
      availableColorThemes 
    }}>
      <ConfigProvider theme={getAntdTheme(currentColorTheme, effectiveMode)}>
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};
