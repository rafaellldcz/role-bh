const primitiveColors = {
  black: '#0b0b0b',
  charcoal: '#151515',
  graphite: '#1c1c1c',
  graphiteLight: '#292927',
  yellow: '#ffd400',
  yellowLight: '#ffe04d',
  yellowDark: '#d6b300',
  offWhite: '#fafaf7',
  stoneLight: '#d8d8d2',
  stone: '#a3a39d',
  stoneDark: '#666660',
  border: '#3a3a36',
  red: '#ff6b6b',
  green: '#4ade80',
  amber: '#fbbf24',
} as const;

export const colors = {
  background: primitiveColors.black,
  backgroundElevated: primitiveColors.charcoal,
  surface: primitiveColors.graphite,
  surfaceInteractive: primitiveColors.graphiteLight,
  brand: primitiveColors.yellow,
  brandHover: primitiveColors.yellowLight,
  brandPressed: primitiveColors.yellowDark,
  textPrimary: primitiveColors.offWhite,
  textSecondary: primitiveColors.stoneLight,
  textMuted: primitiveColors.stone,
  textOnBrand: primitiveColors.black,
  border: primitiveColors.border,
  focus: primitiveColors.yellowLight,
  disabled: primitiveColors.stoneDark,
  danger: primitiveColors.red,
  success: primitiveColors.green,
  warning: primitiveColors.amber,
} as const;

export const fontFamilies = {
  web: 'Arial, Helvetica, sans-serif',
  mobile: {
    android: 'sans-serif',
    ios: 'System',
  },
} as const;

const interfaceFamily = 'interface' as const;

export const typography = {
  display: { family: interfaceFamily, fontSize: 48, fontWeight: '800', lineHeight: 54 },
  heading: { family: interfaceFamily, fontSize: 36, fontWeight: '700', lineHeight: 43 },
  title: { family: interfaceFamily, fontSize: 24, fontWeight: '700', lineHeight: 31 },
  body: { family: interfaceFamily, fontSize: 18, fontWeight: '400', lineHeight: 28 },
  bodySmall: { family: interfaceFamily, fontSize: 16, fontWeight: '400', lineHeight: 24 },
  label: { family: interfaceFamily, fontSize: 14, fontWeight: '700', lineHeight: 20 },
  caption: { family: interfaceFamily, fontSize: 12, fontWeight: '500', lineHeight: 18 },
} as const;

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, '2xl': 48 } as const;

export const radius = { sm: 6, md: 12, lg: 18, full: 999 } as const;

export const elevation = {
  card: {
    web: '0 14px 36px rgba(0, 0, 0, 0.28)',
    mobile: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.24,
      shadowRadius: 18,
      elevation: 4,
    },
  },
  interactive: {
    web: '0 8px 18px rgba(0, 0, 0, 0.22)',
    mobile: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.2,
      shadowRadius: 9,
      elevation: 2,
    },
  },
} as const;

export const interaction = {
  hover: { translateY: -1 },
  pressed: { scale: 0.98 },
  focus: { outlineWidth: 3, outlineOffset: 3 },
  disabled: { opacity: 0.58 },
  error: { borderWidth: 2 },
  touchTarget: { minHeight: 48, minWidth: 48 },
} as const;

export type ColorToken = keyof typeof colors;
export type TypographyVariant = keyof typeof typography;
export type SpacingToken = keyof typeof spacing;
export type RadiusToken = keyof typeof radius;
