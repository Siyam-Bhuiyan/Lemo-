import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, IconName } from '@/components/ui';
import { colors } from '@/theme';

const DOODLES: IconName[] = [
  'airplane', 'map-marker-outline', 'car-side', 'clock-outline', 'bell-outline', 'bag-suitcase-outline',
  'headset', 'star-four-points-outline', 'steering', 'heart-outline', 'compass-outline', 'message-outline',
];

const COLS = 5;
const ROWS = 14;

/** Subtle travel-doodle wallpaper behind chat content. */
export function ChatBackground({ children }: { children: ReactNode }) {
  return (
    <View style={styles.root}>
      <LinearGradient
        colors={['#0b0b0c', '#0e0d0a', '#1c1600']}
        locations={[0, 0.6, 1]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.pattern} pointerEvents="none">
        {Array.from({ length: ROWS }).map((_, r) => (
          <View key={r} style={[styles.row, r % 2 ? { paddingLeft: 38 } : null]}>
            {Array.from({ length: COLS }).map((__, c) => (
              <View key={c} style={{ transform: [{ rotate: `${((r * 7 + c * 13) % 40) - 20}deg` }] }}>
                <Icon name={DOODLES[(r * COLS + c) % DOODLES.length]} size={30} color="rgba(255,255,255,0.05)" />
              </View>
            ))}
          </View>
        ))}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  pattern: { ...StyleSheet.absoluteFill, justifyContent: 'space-around', paddingVertical: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-around' },
});
