import {
  colors,
  elevation,
  fontFamilies,
  interaction,
  radius,
  spacing,
  typography,
} from '@rolebh/design-tokens';
import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';

import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  children: ReactNode;
  variant?: ButtonVariant;
};

type ButtonCustomProperties = CSSProperties & Record<`--button-${string}`, string>;

const variantStyles: Record<ButtonVariant, ButtonCustomProperties> = {
  primary: {
    '--button-background': colors.brand,
    '--button-border': `1px solid ${colors.brand}`,
    '--button-color': colors.textOnBrand,
    '--button-hover-background': colors.brandHover,
    '--button-hover-color': colors.textOnBrand,
    '--button-pressed-background': colors.brandPressed,
    '--button-pressed-color': colors.textOnBrand,
  },
  secondary: {
    '--button-background': 'transparent',
    '--button-border': `1px solid ${colors.brand}`,
    '--button-color': colors.brand,
    '--button-hover-background': colors.surfaceInteractive,
    '--button-hover-color': colors.brandHover,
    '--button-pressed-background': colors.surface,
    '--button-pressed-color': colors.brandPressed,
  },
};

export function Button({ children, variant = 'primary', type = 'button', ...props }: ButtonProps) {
  const style: ButtonCustomProperties = {
    ...variantStyles[variant],
    '--button-min-height': `${interaction.touchTarget.minHeight}px`,
    '--button-min-width': `${interaction.touchTarget.minWidth}px`,
    '--button-padding': `${spacing.sm}px ${spacing.lg}px`,
    '--button-radius': `${radius.md}px`,
    '--button-shadow': elevation.interactive.web,
    '--button-font-size': `${typography.label.fontSize}px`,
    '--button-font-weight': typography.label.fontWeight,
    '--button-line-height': `${typography.label.lineHeight}px`,
    '--button-hover-translate': `${interaction.hover.translateY}px`,
    '--button-pressed-scale': `${interaction.pressed.scale}`,
    '--button-focus-width': `${interaction.focus.outlineWidth}px`,
    '--button-focus-offset': `${interaction.focus.outlineOffset}px`,
    '--button-focus-color': colors.focus,
    '--button-disabled-opacity': `${interaction.disabled.opacity}`,
    fontFamily: fontFamilies.web,
  };

  return (
    <button className={styles.button} style={style} type={type} {...props}>
      {children}
    </button>
  );
}
