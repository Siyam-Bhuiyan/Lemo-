import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode } from 'react';
import { ScrollView, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, SCREEN_PADDING } from '@/theme';

interface Props {
  children: ReactNode;
  scroll?: boolean;
  /** Extra bottom space, e.g. to clear a floating tab bar or action bar. */
  bottomInset?: number;
  padded?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
}

/** Dark gradient page with the signature warm gold glow near the bottom. */
export function Screen({ children, scroll = true, bottomInset = 0, padded = true, contentStyle }: Props) {
  const insets = useSafeAreaInsets();
  const padding = {
    paddingTop: insets.top + 8,
    paddingBottom: bottomInset,
    paddingHorizontal: padded ? SCREEN_PADDING : 0,
  };

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={[colors.background, colors.background, '#171100', colors.goldGlow, '#0b0900']}
        locations={[0, 0.3, 0.62, 0.86, 1]}
        style={StyleSheet.absoluteFill}
      />
      {scroll ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[padding, contentStyle]}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.flex, padding, contentStyle]}>{children}</View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  flex: { flex: 1 },
});
