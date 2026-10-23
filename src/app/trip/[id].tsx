import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ACTION_BAR_HEIGHT, BottomActionBar } from '@/components/layout/BottomActionBar';
import { AppText, Button, SectionHeader } from '@/components/ui';
import { findJourney } from '@/data/journeys';
import { actionsByStatus } from '@/features/trips/actions';
import { EarningsSection } from '@/features/trips/components/details/EarningsSection';
import { FlightCard } from '@/features/trips/components/details/FlightCard';
import { PassengerCard } from '@/features/trips/components/details/PassengerCard';
import { PreferencesGrid } from '@/features/trips/components/details/PreferencesGrid';
import { TripMap } from '@/features/trips/components/details/TripMap';
import { TripSummary } from '@/features/trips/components/details/TripSummary';
import { statusMeta } from '@/features/trips/utils';
import { colors, SCREEN_PADDING } from '@/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { JourneyStatus } from '@/types';

export default function TripDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const journey = findJourney(id);
  const [status, setStatus] = useState<JourneyStatus | undefined>(journey?.status);

  if (!journey || !status) {
    return (
      <View style={styles.missing}>
        <AppText color="textMuted">Journey not found.</AppText>
      </View>
    );
  }

  const current = { ...journey, status };
  const actions = actionsByStatus[status];
  const meta = statusMeta[status];

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={['#000', '#000', '#171100', colors.goldGlow, '#0b0900']}
        locations={[0, 0.3, 0.55, 0.85, 1]}
        style={StyleSheet.absoluteFill}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: actions ? ACTION_BAR_HEIGHT + 24 : 40 }}
      >
        <TripMap statusLabel={meta.label} statusTone={meta.tone} />
        <View style={styles.body}>
          <TripSummary journey={current} />

          <SectionHeader title="Journey Preferences" />
          <PreferencesGrid preferences={journey.preferences} />

          {journey.flight ? (
            <View style={styles.block}>
              <FlightCard flight={journey.flight} />
            </View>
          ) : null}

          <View style={styles.block}>
            <PassengerCard journey={journey} />
          </View>

          {journey.notes ? (
            <>
              <SectionHeader title="Additional Notes" />
              <AppText variant="subheading" style={styles.notes}>
                {journey.notes}
              </AppText>
            </>
          ) : null}

          <View style={styles.block}>
            <EarningsSection journey={current} />
          </View>
        </View>
      </ScrollView>

      {actions ? (
        <BottomActionBar>
          <Button
            label={actions.secondary.label}
            variant="danger"
            style={styles.secondary}
            onPress={() => setStatus(actions.secondary.next)}
          />
          <Button
            label={actions.primary.label}
            icon={actions.primary.icon}
            style={styles.primary}
            onPress={() => setStatus(actions.primary.next)}
          />
        </BottomActionBar>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000' },
  missing: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' },
  body: { paddingHorizontal: SCREEN_PADDING, marginTop: 4 },
  block: { marginTop: 22 },
  notes: { fontFamily: 'Figtree_400Regular', fontSize: 18, lineHeight: 27 },
  secondary: { flex: 1 },
  primary: { flex: 1.5 },
});
