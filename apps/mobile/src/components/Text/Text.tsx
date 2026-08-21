import { colors, fontFamilies, typography } from '@rolebh/design-tokens';
import {
  Platform,
  StyleSheet,
  Text as NativeText,
  type StyleProp,
  type TextProps as NativeTextProps,
  type TextStyle,
} from 'react-native';

type TextVariant = keyof typeof typography;
type TextTone = 'brand' | 'muted' | 'onBrand' | 'primary' | 'secondary';

type TextProps = Omit<NativeTextProps, 'style'> & {
  style?: StyleProp<TextStyle>;
  tone?: TextTone;
  variant?: TextVariant;
};

const variantStyles = Object.fromEntries(
  Object.entries(typography).map(([variant, token]) => [
    variant,
    {
      fontFamily: Platform.select({
        android: fontFamilies.mobile.android,
        ios: fontFamilies.mobile.ios,
      }),
      fontSize: token.fontSize,
      fontWeight: token.fontWeight,
      lineHeight: token.lineHeight,
    },
  ]),
) as Record<TextVariant, TextStyle>;

const toneStyles = StyleSheet.create({
  brand: { color: colors.brand },
  muted: { color: colors.textMuted },
  onBrand: { color: colors.textOnBrand },
  primary: { color: colors.textPrimary },
  secondary: { color: colors.textSecondary },
});

export function Text({ style, tone = 'primary', variant = 'body', ...props }: TextProps) {
  return <NativeText style={[variantStyles[variant], toneStyles[tone], style]} {...props} />;
}
