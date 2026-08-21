import { colors, fontFamilies, typography } from '@rolebh/design-tokens';
import type { CSSProperties, ReactNode } from 'react';

type TextVariant = keyof typeof typography;
type TextTone = 'brand' | 'muted' | 'primary' | 'secondary';
type TextElement = 'h1' | 'h2' | 'h3' | 'p' | 'span';

type TextProps = {
  as?: TextElement;
  children: ReactNode;
  style?: CSSProperties;
  tone?: TextTone;
  variant?: TextVariant;
};

const defaultElement: Record<TextVariant, TextElement> = {
  display: 'h1',
  heading: 'h2',
  title: 'h3',
  body: 'p',
  bodySmall: 'p',
  label: 'span',
  caption: 'span',
};

const toneColors: Record<TextTone, string> = {
  brand: colors.brand,
  muted: colors.textMuted,
  primary: colors.textPrimary,
  secondary: colors.textSecondary,
};

export function Text({ as, children, style, tone = 'primary', variant = 'body' }: TextProps) {
  const Component = as ?? defaultElement[variant];
  const token = typography[variant];
  const tokenStyle: CSSProperties = {
    margin: 0,
    color: toneColors[tone],
    fontFamily: fontFamilies.web,
    fontSize: token.fontSize,
    fontWeight: token.fontWeight,
    lineHeight: `${token.lineHeight}px`,
  };

  return <Component style={{ ...tokenStyle, ...style }}>{children}</Component>;
}
