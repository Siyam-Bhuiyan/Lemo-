import { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { colors, radius } from '@/theme';

interface Props {
  children: ReactNode;
  outlined?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function Card({ children, outlined = true, style }: Props) {
  return <View style={[styles.card, outlined && styles.outlined, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(18,18,21,0.92)',
    borderRadius: radius.lg,
    padding: 14,
  },
  outlined: { borderWidth: 1, borderColor: colors.border },
});
