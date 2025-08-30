import React from 'react';
import { Segmented } from 'antd';
import { BulbOutlined, BulbFilled, SettingOutlined } from '@ant-design/icons';
import { useTheme } from '../contexts/ThemeContext';
import type { ThemeMode } from '../config/themes';

export const ModeToggle: React.FC = () => {
  const { currentMode, effectiveMode, setMode } = useTheme();

  const getModeLabel = () => {
    switch (currentMode) {
      case 'light': return 'Light Mode';
      case 'dark': return 'Dark Mode';
      case 'auto': return `Auto Mode (${effectiveMode === 'dark' ? 'Dark' : 'Light'})`;
      default: return 'Theme Mode';
    }
  };

  const options = [
    {
      label: 'Light',
      value: 'light' as ThemeMode,
      icon: <BulbOutlined />
    },
    {
      label: 'Auto',
      value: 'auto' as ThemeMode,
      icon: <SettingOutlined />
    },
    {
      label: 'Dark',
      value: 'dark' as ThemeMode,
      icon: <BulbFilled />
    }
  ];

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      padding: '12px 16px',
      fontFamily: 'var(--font-primary)',
      gap: '12px'
    }}>
      <span style={{ 
        color: 'var(--theme-text)',
        fontFamily: 'var(--font-primary)',
        fontWeight: 'var(--font-weight-semibold)',
        fontSize: '16px'
      }}>
        {getModeLabel()}
      </span>
      <Segmented
        value={currentMode}
        onChange={(value) => setMode(value as ThemeMode)}
        options={options}
        style={{
          backgroundColor: 'var(--theme-surface)',
          border: '1px solid var(--theme-border)'
        }}
      />
    </div>
  );
};
