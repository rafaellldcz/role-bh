import { colors, elevation, radius, spacing } from '@rolebh/design-tokens';
import { StyleSheet, View, type ViewProps } from 'react-native';

type CardProps = ViewProps;

export function Card({ children, style, ...props }: CardProps) {
  return (
    <View style={[styles.card, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    elevation: elevation.card.mobile.elevation,
    padding: spacing.lg,
    shadowColor: elevation.card.mobile.shadowColor,
    shadowOffset: elevation.card.mobile.shadowOffset,
    shadowOpacity: elevation.card.mobile.shadowOpacity,
    shadowRadius: elevation.card.mobile.shadowRadius,
  },
});
