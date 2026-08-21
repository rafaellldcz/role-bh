import { spacing } from '@rolebh/design-tokens';
import type { CSSProperties, ReactNode } from 'react';

type ContainerProps = { children: ReactNode };

export function Container({ children }: ContainerProps) {
  const style: CSSProperties = {
    boxSizing: 'border-box',
    width: '100%',
    maxWidth: 1120,
    marginInline: 'auto',
    paddingInline: `clamp(${spacing.md}px, 4vw, ${spacing.xl}px)`,
  };

  return <div style={style}>{children}</div>;
}
