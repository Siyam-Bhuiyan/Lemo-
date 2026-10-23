import { StyleSheet, View } from 'react-native';
import { AppText, Card } from '@/components/ui';
import { RouteLine } from '@/features/trips/components/RouteLine';
import { isAirportDropoff, isAirportPickup } from '@/features/trips/utils';
import { Journey } from '@/types';

/** Pinned route + ETA card at the top of a passenger conversation. */
export function JourneyBanner({ journey, minutes }: { journey: Journey; minutes: number }) {
  return (
    <Card style={styles.card}>
      <RouteLine
        fromName={journey.pickup.name}
        toName={journey.dropoff.name}
        fromIcon={isAirportPickup(journey) ? 'airplane-landing' : 'map-marker-outline'}
        toIcon={isAirportDropoff(journey) ? 'airplane-takeoff' : 'map-marker'}
      />
      <View style={styles.eta}>
        <AppText variant="label" weight="Figtree_400Regular">
          Pickup in
        </AppText>
        <AppText variant="display" style={styles.big}>
          {minutes}
          <AppText variant="label" color="textMuted">
            M
          </AppText>
        </AppText>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 18, marginBottom: 16, backgroundColor: 'rgba(12,12,14,0.94)' },
  eta: { alignItems: 'center', paddingRight: 8 },
  big: { fontSize: 34, lineHeight: 40 },
});
