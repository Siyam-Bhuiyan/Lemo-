import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText, Screen, SegmentedControl } from '@/components/ui';
import { mockJourneys } from '@/data/journeys';
import { JourneyCard } from '@/features/trips/components/JourneyCard';
import { TAB_BAR_HEIGHT } from '@/theme';

type Tab = 'upcoming' | 'completed' | 'cancelled';

const filters: Record<Tab, (s: string) => boolean> = {
  upcoming: (s) => ['requested', 'booked', 'onWay', 'inProgress'].includes(s),
  completed: (s) => s === 'completed',
  cancelled: (s) => s === 'cancelled',
};

export default function TripsScreen() {
  const [tab, setTab] = useState<Tab>('upcoming');
  const items = useMemo(() => mockJourneys.filter((j) => filters[tab](j.status)), [tab]);

  return (
    <Screen bottomInset={TAB_BAR_HEIGHT + 50}>
      <AppText variant="title" style={styles.title}>
        My Journeys
      </AppText>
      <View style={styles.tabs}>
        <SegmentedControl
          value={tab}
          onChange={setTab}
          options={[
            { value: 'upcoming', label: 'Upcoming' },
            { value: 'completed', label: 'Completed' },
            { value: 'cancelled', label: 'Cancelled' },
          ]}
        />
      </View>
      {items.map((j) => (
        <JourneyCard key={j.id} journey={j} />
      ))}
      {items.length === 0 ? (
        <AppText color="textMuted" style={styles.empty}>
          No journeys here yet.
        </AppText>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 24, marginVertical: 12 },
  tabs: { flexDirection: 'row', marginBottom: 18 },
  empty: { textAlign: 'center', marginTop: 40 },
});
