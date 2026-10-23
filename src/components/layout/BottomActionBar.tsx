import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/** Sticky footer holding the primary / secondary action pair. */
export function BottomActionBar({ children }: { children: ReactNode }) {
  const insets = useSafeAreaInsets();
  return <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 12) }]}>{children}</View>;
}

export const ACTION_BAR_HEIGHT = 96;

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    gap: 12,
    paddingTop: 14,
    paddingHorizontal: 16,
    backgroundColor: '#0e0e11',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
});
