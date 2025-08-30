import React from 'react';
import { Tooltip } from 'antd';
import { useTheme } from '../contexts/ThemeContext';
import type { ColorTheme } from '../config/themes';
import { colorThemes } from '../config/themes';

export const ThemeSwitcher: React.FC = () => {
  const { currentColorTheme, setColorTheme, availableColorThemes } = useTheme();

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      gap: '16px', 
      padding: '12px 16px',
      fontFamily: 'var(--font-primary)'
    }} className="theme-color-picker">
      {availableColorThemes.map((theme) => (
        <Tooltip key={theme} title={colorThemes[theme].name} placement="top">
          <div
            onClick={() => setColorTheme(theme)}
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              backgroundColor: colorThemes[theme].dotColor,
              cursor: 'pointer',
              border: theme === currentColorTheme ? '4px solid var(--theme-text)' : '2px solid transparent',
              boxSizing: 'border-box',
              transition: 'all 0.2s ease',
              transform: theme === currentColorTheme ? 'scale(1.15)' : 'scale(1)',
              outline: theme === currentColorTheme ? '2px solid var(--theme-primary)' : 'none',
              outlineOffset: '2px',
            }}
          />
        </Tooltip>
      ))}
    </div>
  );
};
