import { LinearGradient } from 'expo-linear-gradient';
import { useRef, useState } from 'react';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from 'react-native';
import { AppText, Icon, IconName } from '@/components/ui';
import { colors, radius, SCREEN_PADDING } from '@/theme';
import { useWindowDimensions } from 'react-native';
import { formatMoney } from '@/features/trips/utils';
import { mockStats } from '@/data/driver';

interface Slide {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  highlight: string;
  icon: IconName;
}

const SLIDES: Slide[] = [
  {
    id: 's1',
    eyebrow: 'Weekly Earnings',
    title: formatMoney(mockStats.weekEarnings),
    body: `${mockStats.tripsThisWeek} journeys completed this week`,
    highlight: '+12% vs last week',
    icon: 'car-sports',
  },
  {
    id: 's2',
    eyebrow: 'Bonus Challenge',
    title: `${mockStats.bonusTarget - mockStats.tripsThisWeek} trips to go`,
    body: 'Complete 30 journeys this week and unlock a bonus payout.',
    highlight: '$150 bonus',
    icon: 'trophy-outline',
  },
  {
    id: 's3',
    eyebrow: 'Airport Surge',
    title: 'MIA is busy now',
    body: 'High demand for pickups at Terminal 2E over the next hour.',
    highlight: '1.4x fares',
    icon: 'airplane-landing',
  },
];

const GAP = 12;

export function PromoCarousel() {
  const { width } = useWindowDimensions();
  const itemWidth = width - SCREEN_PADDING * 2;
  const [index, setIndex] = useState(0);
  const ref = useRef<FlatList<Slide>>(null);

  const onEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) =>
    setIndex(Math.round(e.nativeEvent.contentOffset.x / (itemWidth + GAP)));

  return (
    <View style={styles.wrap}>
      <FlatList
        ref={ref}
        data={SLIDES}
        horizontal
        keyExtractor={(s) => s.id}
        showsHorizontalScrollIndicator={false}
        snapToInterval={itemWidth + GAP}
        decelerationRate="fast"
        onMomentumScrollEnd={onEnd}
        ItemSeparatorComponent={() => <View style={{ width: GAP }} />}
        renderItem={({ item }) => (
          <LinearGradient
            colors={['#23262b', '#121315']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.slide, { width: itemWidth }]}
          >
            <View style={styles.art}>
              <Icon name={item.icon} size={150} color="rgba(255,255,255,0.07)" />
            </View>
            <AppText variant="label" color="blue">
              {item.eyebrow}
            </AppText>
            <AppText variant="title" style={styles.title}>
              {item.title}
            </AppText>
            <AppText variant="caption" color="textMuted" style={styles.body}>
              {item.body}
            </AppText>
            <AppText variant="heading" color="gold">
              {item.highlight}
            </AppText>
          </LinearGradient>
        )}
      />
      <View style={styles.dots}>
        {SLIDES.map((s, i) => (
          <View key={s.id} style={[styles.dot, i === index && styles.dotActive]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: 16 },
  slide: {
    height: 142,
    borderRadius: radius.lg,
    padding: 16,
    gap: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.borderSoft,
    justifyContent: 'center',
  },
  art: { position: 'absolute', right: -14, bottom: -20 },
  title: { fontSize: 24, lineHeight: 30, fontFamily: 'Figtree_600SemiBold' },
  body: { maxWidth: '70%', marginBottom: 6 },
  dots: { flexDirection: 'row', gap: 5, position: 'absolute', bottom: 10, left: 16 },
  dot: { width: 8, height: 3, borderRadius: 2, backgroundColor: '#555' },
  dotActive: { width: 26, backgroundColor: colors.gold },
});
