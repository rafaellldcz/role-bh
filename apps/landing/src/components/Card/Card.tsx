import { colors, elevation, radius, spacing } from '@rolebh/design-tokens';
import type { CSSProperties, ReactNode } from 'react';

type CardProps = {
  as?: 'article' | 'div' | 'section';
  children: ReactNode;
};

export function Card({ as: Component = 'article', children }: CardProps) {
  const style: CSSProperties = {
    boxSizing: 'border-box',
    minWidth: 0,
    width: '100%',
    padding: spacing.lg,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    boxShadow: elevation.card.web,
  };

  return <Component style={style}>{children}</Component>;
}
