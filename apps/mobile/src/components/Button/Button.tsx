import { colors, interaction, radius, spacing, typography } from '@rolebh/design-tokens';
import { Pressable, StyleSheet, type PressableProps } from 'react-native';

import { Text } from '../Text/Text';

type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = Omit<PressableProps, 'children' | 'style'> & {
  label: string;
  variant?: ButtonVariant;
};

export function Button({ disabled = false, label, variant = 'primary', ...props }: ButtonProps) {
  const isPrimary = variant === 'primary';
  const isDisabled = disabled === true;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        isPrimary ? styles.primary : styles.secondary,
        pressed && !isDisabled && (isPrimary ? styles.primaryPressed : styles.secondaryPressed),
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
      ]}
      {...props}
    >
      <Text tone={isPrimary ? 'onBrand' : 'brand'} variant="label">
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: interaction.touchTarget.minHeight,
    minWidth: interaction.touchTarget.minWidth,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  primary: {
    backgroundColor: colors.brand,
    borderColor: colors.brand,
  },
  primaryPressed: {
    backgroundColor: colors.brandPressed,
    borderColor: colors.brandPressed,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderColor: colors.brand,
  },
  secondaryPressed: {
    backgroundColor: colors.surfaceInteractive,
    borderColor: colors.brandPressed,
  },
  pressed: {
    transform: [{ scale: interaction.pressed.scale }],
  },
  disabled: {
    backgroundColor: colors.disabled,
    borderColor: colors.disabled,
    opacity: interaction.disabled.opacity,
  },
  label: {
    fontSize: typography.label.fontSize,
  },
});
