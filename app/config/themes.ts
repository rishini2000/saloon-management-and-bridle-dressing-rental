import { theme } from 'antd';

export type ThemeType = 'dark' | 'lavender' | 'mint' | 'peach' | 'sky' | 'rose';

export interface ThemeConfig {
  name: string;
  type: 'light' | 'dark';
  primaryColor: string;
  backgroundColor: string;
  surfaceColor: string;
  siderColor: string;
  borderColor: string;
  textColor: string;
  secondaryTextColor: string;
  dotColor: string;
}

export const themeConfigs: Record<ThemeType, ThemeConfig> = {
  dark: {
    name: 'Dark',
    type: 'dark',
    primaryColor: '#722ed1',
    backgroundColor: '#0f0f0f',
    surfaceColor: '#1a1a1a',
    siderColor: '#262626',
    borderColor: '#434343',
    textColor: '#ffffff',
    secondaryTextColor: '#a0a0a0',
    dotColor: '#722ed1'
  },
  lavender: {
    name: 'Lavender Dreams',
    type: 'light',
    primaryColor: '#b37feb',
    backgroundColor: '#fafafa',
    surfaceColor: '#ffffff',
    siderColor: '#f6f0ff',
    borderColor: '#e6d7ff',
    textColor: '#2c2c2c',
    secondaryTextColor: '#666666',
    dotColor: '#b37feb'
  },
  mint: {
    name: 'Mint Fresh',
    type: 'light',
    primaryColor: '#52c41a',
    backgroundColor: '#fafafa',
    surfaceColor: '#ffffff',
    siderColor: '#f0fff4',
    borderColor: '#d9f7be',
    textColor: '#2c2c2c',
    secondaryTextColor: '#666666',
    dotColor: '#52c41a'
  },
  peach: {
    name: 'Peach Blossom',
    type: 'light',
    primaryColor: '#ff9c6e',
    backgroundColor: '#fafafa',
    surfaceColor: '#ffffff',
    siderColor: '#fff7f0',
    borderColor: '#ffd8bf',
    textColor: '#2c2c2c',
    secondaryTextColor: '#666666',
    dotColor: '#ff9c6e'
  },
  sky: {
    name: 'Sky Blue',
    type: 'light',
    primaryColor: '#40a9ff',
    backgroundColor: '#fafafa',
    surfaceColor: '#ffffff',
    siderColor: '#f0f9ff',
    borderColor: '#bae7ff',
    textColor: '#2c2c2c',
    secondaryTextColor: '#666666',
    dotColor: '#40a9ff'
  },
  rose: {
    name: 'Rose Garden',
    type: 'light',
    primaryColor: '#eb2f96',
    backgroundColor: '#fafafa',
    surfaceColor: '#ffffff',
    siderColor: '#fff0f6',
    borderColor: '#ffadd2',
    textColor: '#2c2c2c',
    secondaryTextColor: '#666666',
    dotColor: '#eb2f96'
  }
};

export const getAntdTheme = (themeType: ThemeType) => {
  const config = themeConfigs[themeType];
  
  return {
    algorithm: config.type === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: config.primaryColor,
      colorBgContainer: config.surfaceColor,
      colorBgLayout: config.backgroundColor,
      colorBorder: config.borderColor,
      colorText: config.textColor,
      colorTextSecondary: config.secondaryTextColor,
      fontFamily: '"Montagu Slab", "Figtree", -apple-system, BlinkMacSystemFont, sans-serif',
      fontFamilyCode: '"Figtree", monospace',
      borderRadius: 8,
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
        itemColor: config.type === 'dark' ? '#ffffff' : config.textColor,
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
