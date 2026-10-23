import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Line, Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Badge, BadgeTone, IconButton } from '@/components/ui';

interface Props {
  statusLabel: string;
  statusTone: BadgeTone;
}

const ROADS: [number, number, number, number][] = [
  [0, 40, 400, 20], [0, 110, 400, 90], [0, 190, 400, 230], [0, 250, 400, 270],
  [40, 0, 70, 300], [130, 0, 110, 300], [210, 0, 250, 300], [300, 0, 280, 300], [360, 0, 380, 300],
];

const ROUTE = 'M 10 150 C 60 140 90 105 160 98 L 250 75 C 270 72 285 85 285 112 L 288 190';

/**
 * Stylised dark map with the route drawn over it.
 * Swap the SVG for `react-native-maps` once real coordinates are wired in.
 */
export function TripMap({ statusLabel, statusTone }: Props) {
  const insets = useSafeAreaInsets();
  const height = 250 + insets.top;
  return (
    <View style={{ height }}>
      <View style={[StyleSheet.absoluteFill, { backgroundColor: '#161618' }]}>
        <Svg width="100%" height="100%" viewBox="0 0 320 300" preserveAspectRatio="xMidYMid slice">
          {ROADS.map(([x1, y1, x2, y2], i) => (
            <Line key={i} x1={x1 * 0.8} y1={y1} x2={x2 * 0.8} y2={y2} stroke="#2a2a2d" strokeWidth={i % 3 === 0 ? 5 : 2.5} />
          ))}
          <Path d={ROUTE} stroke="#fff" strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <Circle cx={10} cy={150} r={7} fill="#fff" />
          <Circle cx={288} cy={190} r={8} fill="#fff" />
          <Circle cx={288} cy={190} r={3} fill="#111" />
        </Svg>
      </View>
      <LinearGradient colors={['rgba(0,0,0,0.5)', 'transparent', '#000']} style={StyleSheet.absoluteFill} />
      <View style={[styles.top, { top: insets.top + 8 }]}>
        <IconButton icon="arrow-left" tone="light" size={56} onPress={() => router.back()} />
        <IconButton icon="headset" tone="light" size={56} />
      </View>
      <View style={styles.badge}>
        <View style={styles.badgeBox}>
          <Badge label={statusLabel} tone={statusTone} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  top: { position: 'absolute', left: 16, right: 16, flexDirection: 'row', justifyContent: 'space-between' },
  badge: { position: 'absolute', right: 18, bottom: 14 },
  badgeBox: { borderWidth: 1, borderColor: 'rgba(245,158,11,0.4)', borderRadius: 8, backgroundColor: 'rgba(30,22,6,0.9)' },
});
