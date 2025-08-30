import { theme } from 'antd';

export type ColorTheme = 'lavender' | 'mint' | 'peach' | 'sky' | 'rose';
export type ThemeMode = 'light' | 'dark' | 'auto';

export interface ColorThemeConfig {
  name: string;
  primaryColor: string;
  dotColor: string;
}

export interface ThemeConfig {
  name: string;
  primaryColor: string;
  backgroundColor: string;
  surfaceColor: string;
  siderColor: string;
  borderColor: string;
  textColor: string;
  secondaryTextColor: string;
  dotColor: string;
}

export const colorThemes: Record<ColorTheme, ColorThemeConfig> = {
  lavender: {
    name: 'Lavender Dreams',
    primaryColor: '#b37feb',
    dotColor: '#b37feb'
  },
  mint: {
    name: 'Mint Fresh',
    primaryColor: '#52c41a',
    dotColor: '#52c41a'
  },
  peach: {
    name: 'Peach Blossom',
    primaryColor: '#ff9c6e',
    dotColor: '#ff9c6e'
  },
  sky: {
    name: 'Sky Blue',
    primaryColor: '#40a9ff',
    dotColor: '#40a9ff'
  },
  rose: {
    name: 'Rose Garden',
    primaryColor: '#eb2f96',
    dotColor: '#eb2f96'
  }
};

const lightThemeBase = {
  backgroundColor: '#fafafa',
  surfaceColor: '#ffffff',
  textColor: '#2c2c2c',
  secondaryTextColor: '#666666',
};

const darkThemeBase = {
  backgroundColor: '#0f0f0f',
  surfaceColor: '#1a1a1a',
  textColor: '#ffffff',
  secondaryTextColor: '#a0a0a0',
};

const getSiderColor = (primaryColor: string, isDark: boolean): string => {
  if (isDark) {
    // Dark variants with subtle tint
    const colorMap: Record<string, string> = {
      '#b37feb': '#2a1a3a', // lavender dark
      '#52c41a': '#1a2e1a', // mint dark
      '#ff9c6e': '#3a2a1a', // peach dark
      '#40a9ff': '#1a2a3a', // sky dark
      '#eb2f96': '#3a1a2a', // rose dark
    };
    return colorMap[primaryColor] || '#262626';
  } else {
    // Light variants
    const colorMap: Record<string, string> = {
      '#b37feb': '#f6f0ff', // lavender light
      '#52c41a': '#f0fff4', // mint light
      '#ff9c6e': '#fff7f0', // peach light
      '#40a9ff': '#f0f9ff', // sky light
      '#eb2f96': '#fff0f6', // rose light
    };
    return colorMap[primaryColor] || '#f5f5f5';
  }
};

const getBorderColor = (primaryColor: string, isDark: boolean): string => {
  if (isDark) {
    // Dark borders with subtle tint
    const colorMap: Record<string, string> = {
      '#b37feb': '#4a3a5a', // lavender dark border
      '#52c41a': '#3a4e3a', // mint dark border
      '#ff9c6e': '#5a4a3a', // peach dark border
      '#40a9ff': '#3a4a5a', // sky dark border
      '#eb2f96': '#5a3a4a', // rose dark border
    };
    return colorMap[primaryColor] || '#434343';
  } else {
    // Light borders
    const colorMap: Record<string, string> = {
      '#b37feb': '#e6d7ff', // lavender light border
      '#52c41a': '#d9f7be', // mint light border
      '#ff9c6e': '#ffd8bf', // peach light border
      '#40a9ff': '#bae7ff', // sky light border
      '#eb2f96': '#ffadd2', // rose light border
    };
    return colorMap[primaryColor] || '#e8e8e8';
  }
};

export const getThemeConfig = (colorTheme: ColorTheme, mode: ThemeMode): ThemeConfig => {
  const colorConfig = colorThemes[colorTheme];
  const baseConfig = mode === 'dark' ? darkThemeBase : lightThemeBase;
  
  return {
    name: `${colorConfig.name} (${mode === 'dark' ? 'Dark' : 'Light'})`,
    primaryColor: colorConfig.primaryColor,
    backgroundColor: baseConfig.backgroundColor,
    surfaceColor: baseConfig.surfaceColor,
    siderColor: getSiderColor(colorConfig.primaryColor, mode === 'dark'),
    borderColor: getBorderColor(colorConfig.primaryColor, mode === 'dark'),
    textColor: baseConfig.textColor,
    secondaryTextColor: baseConfig.secondaryTextColor,
    dotColor: colorConfig.dotColor,
  };
};

export const getAntdTheme = (colorTheme: ColorTheme, mode: ThemeMode) => {
  const config = getThemeConfig(colorTheme, mode);
  
  return {
    algorithm: mode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: config.primaryColor,
      colorBgContainer: config.surfaceColor,
      colorBgLayout: config.backgroundColor,
      colorBorder: config.borderColor,
      colorText: config.textColor,
      colorTextSecondary: config.secondaryTextColor,
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      fontFamilyCode: '"Inter", monospace',
      fontSize: 14,
      fontSizeHeading1: 28,
      fontSizeHeading2: 24,
      fontSizeHeading3: 20,
      fontSizeHeading4: 18,
      fontSizeHeading5: 16,
      fontWeightStrong: 600,
      borderRadius: 6,
      borderRadiusLG: 8,
      boxShadow: 'none',
      boxShadowSecondary: 'none',
      boxShadowTertiary: 'none',
    },
    components: {
      Layout: {
        siderBg: config.siderColor,
        headerBg: config.surfaceColor,
        bodyBg: config.backgroundColor,
        triggerBg: config.siderColor,
      },
      Menu: {
        itemBg: 'transparent',
        itemSelectedBg: config.primaryColor + '20',
        itemHoverBg: config.primaryColor + '10',
        itemSelectedColor: config.primaryColor,
        itemColor: mode === 'dark' ? '#ffffff' : config.textColor,
        iconSize: 18,
      },
      Button: {
        boxShadow: 'none',
        boxShadowSecondary: 'none',
      },
      Card: {
        boxShadow: 'none',
        boxShadowTertiary: 'none',
      },
      Dropdown: {
        boxShadowSecondary: 'none',
      },
      Drawer: {
        boxShadow: 'none',
      },
      Modal: {
        boxShadow: 'none',
      },
      Popover: {
        boxShadowSecondary: 'none',
      },
      Table: {
        boxShadow: 'none',
      },
      Tooltip: {
        boxShadowSecondary: 'none',
      }
    }
  };
};
