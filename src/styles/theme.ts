import type { ThemeConfig } from 'antd'

export const COLORS = {
  PRIMARY: '#EAB15A',
  BG: '#000',

  DARK_YELLOW: '#f8ad3aa6',

  TRANSPARENT: 'transparent',
  NONE: 'none',

  NEUTRAL05: '#F3F3F3',
  NEUTRAL10: '#E7E7E8',
  NEUTRAL20: '#CFCFD0',
  NEUTRAL40: '#A0A0A1',
  NEUTRAL60: '#707072',
  NEUTRAL80: '#404043',
  NEUTRAL90: '#28282C',
  NEUTRAL95: '#1C1C20',
  NEUTRAL100: '#111014',

  WHITE: '#FFFFFF',
  BLACK: '#000000',
  PURPLE: '#E3B4FA',
  RED: '#DF6A70',
  ORANGE: '#F59D7F',
  BLUE: '#8CC8FA',
  GREEN: '#CAF99C',
  CYAN: '#A2F0EB',
}

export const config: ThemeConfig = {
  token: {
    colorText: COLORS.BLACK,
    colorPrimary: COLORS.PRIMARY,
    colorPrimaryHover: COLORS.DARK_YELLOW,
    colorError: COLORS.RED,
    colorInfo: COLORS.BLUE,
    colorInfoBorder: COLORS.BLUE,
    fontSizeHeading1: 30,
    fontSizeHeading2: 24,
    fontSizeHeading3: 18,
    fontSizeHeading4: 14,
    fontSizeHeading5: 12,
    borderRadius: 16,
    fontFamily: 'Satoshi, sans-serif',
  },
  components: {
    Layout: {
      bodyBg: COLORS.BG,
    },
    Tabs: {
      horizontalItemGutter: 8,
      horizontalItemPadding: '4px 0px',
    },
    Card: {
      borderRadiusLG: 24,
      colorBorder: COLORS.TRANSPARENT,
      boxShadow: COLORS.NONE,
      lineWidth: 1.5,
      paddingLG: 16,
    },
    Button: {
      borderRadiusLG: 16,
      controlHeightLG: 48,
      paddingInline: 16,
      borderRadius: 8,
      fontSizeLG: 16,
      colorPrimary: COLORS.BLACK,
      colorLink: COLORS.PRIMARY,
    },
    Typography: {
      fontSizeHeading1: 30,
      fontSizeHeading2: 24,
      fontSizeHeading3: 18,
      colorLink: COLORS.PRIMARY,
    },
    Segmented: {
      controlHeight: 56,
      lineWidthBold: 0,
      borderRadiusSM: 24,
    },
    Input: {
      borderRadiusLG: 16,
      controlHeightLG: 56,
    },
    InputNumber: {
      borderRadius: 16,
      controlHeightLG: 56,
    },
    Collapse: {
      borderRadiusLG: 24,
      colorBorder: COLORS.TRANSPARENT,
    },
    Modal: {
      borderRadiusLG: 24,
    },
  },
}
