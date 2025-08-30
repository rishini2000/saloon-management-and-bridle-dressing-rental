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
      alignItems: 'center', 
      justifyContent: 'center',
      gap: '12px',
      padding: '12px 16px'
    }}>
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
              border: theme === currentColorTheme ? '3px solid var(--theme-text)' : '2px solid transparent',
              boxSizing: 'border-box',
              transition: 'all 0.2s ease',
              transform: theme === currentColorTheme ? 'scale(1.1)' : 'scale(1)',
            }}
          />
        </Tooltip>
      ))}
    </div>
  );
};
