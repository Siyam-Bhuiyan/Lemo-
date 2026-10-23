import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { AppText, Badge, Card, Icon } from '@/components/ui';
import { colors, radius } from '@/theme';
import { Journey } from '@/types';
import { useCountdown } from '../hooks/useCountdown';
import { formatMoney, isAirportDropoff, isAirportPickup, journeyTypeMeta, payout, statusMeta } from '../utils';
import { DateBlock } from './DateBlock';
import { RouteLine } from './RouteLine';

function Countdown({ seconds }: { seconds: number }) {
  const { minutes, seconds: s } = useCountdown(seconds);
  return (
    <View style={styles.countWrap}>
      <AppText variant="label" color="text" weight="Figtree_400Regular">
        Pickup in
      </AppText>
      <AppText variant="display" style={styles.count}>
        {minutes}
        <AppText variant="label" color="textMuted">
          M{' '}
        </AppText>
        {String(s).padStart(2, '0')}
        <AppText variant="label" color="textMuted">
          S
        </AppText>
      </AppText>
    </View>
  );
}

export function JourneyCard({ journey }: { journey: Journey }) {
  const type = journeyTypeMeta[journey.type];
  const status = statusMeta[journey.status];
  const live = journey.status === 'onWay' && journey.arrivesInSeconds;
  const open = () => router.push({ pathname: '/trip/[id]', params: { id: journey.id } });

  return (
    <Pressable onPress={open}>
      <Card style={styles.card}>
        <View style={styles.top}>
          <View style={styles.topLeft}>
            <Icon name={type.icon} size={24} />
            <View>
              <AppText variant="bodyStrong">{type.label}</AppText>
              <AppText variant="caption" color="textMuted">
                #{journey.id}
              </AppText>
            </View>
          </View>
          <Badge label={status.label} tone={status.tone} />
        </View>

        <View style={styles.mid}>
          <RouteLine
            fromName={journey.pickup.name}
            toName={journey.dropoff.name}
            fromIcon={isAirportPickup(journey) ? 'airplane-landing' : 'map-marker-outline'}
            toIcon={isAirportDropoff(journey) ? 'airplane-takeoff' : 'map-marker'}
          />
          {live ? (
            <Countdown seconds={journey.arrivesInSeconds!} />
          ) : (
            <DateBlock month={journey.month} day={journey.day} time={journey.time} />
          )}
        </View>

        <View style={styles.footer}>
          <View style={styles.fare}>
            <AppText variant="heading" style={styles.money}>
              {formatMoney(payout(journey))}
            </AppText>
            <AppText variant="caption" color="textMuted">
              Est. {journey.estMinutes} min
            </AppText>
          </View>
          <View style={styles.more}>
            <AppText variant="label">Show more</AppText>
            <Icon name="chevron-right" size={16} />
          </View>
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { padding: 16, gap: 14, marginBottom: 14 },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  topLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  mid: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  countWrap: { alignItems: 'flex-end' },
  count: { fontSize: 30 },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    paddingTop: 12,
  },
  fare: { flexDirection: 'row', alignItems: 'baseline', gap: 8 },
  money: { fontSize: 20 },
  more: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: colors.surfaceRaised,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.sm,
  },
});
