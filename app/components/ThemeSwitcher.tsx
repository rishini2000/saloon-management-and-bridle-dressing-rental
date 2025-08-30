import React from 'react';
import { Tooltip } from 'antd';
import { useTheme } from '../contexts/ThemeContext';
import type { ThemeType } from '../config/themes';
import { themeConfigs } from '../config/themes';

export const ThemeSwitcher: React.FC = () => {
  const { currentTheme, setTheme, availableThemes } = useTheme();

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '8px',
      padding: '8px 12px',
      borderTop: '1px solid var(--theme-border)'
    }}>
      {availableThemes.map((theme) => (
        <Tooltip key={theme} title={themeConfigs[theme].name} placement="top">
          <div
            onClick={() => setTheme(theme)}
            style={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              backgroundColor: themeConfigs[theme].dotColor,
              cursor: 'pointer',
              border: theme === currentTheme ? '3px solid var(--theme-text)' : '2px solid transparent',
              boxSizing: 'border-box',
              transition: 'all 0.2s ease',
              transform: theme === currentTheme ? 'scale(1.1)' : 'scale(1)',
            }}
          />
        </Tooltip>
      ))}
    </div>
  );
};
