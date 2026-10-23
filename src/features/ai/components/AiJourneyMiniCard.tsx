import { StyleSheet, View } from 'react-native';
import { AppText, Badge, Icon } from '@/components/ui';
import { colors, radius } from '@/theme';
import { Journey } from '@/types';
import { formatMoney, journeyTypeMeta, payout, statusMeta } from '@/features/trips/utils';

/** Full summary card shown when a journey is referenced in the AI conversation. */
export function AiJourneyMiniCard({ journey }: { journey: Journey }) {
  const type = journeyTypeMeta[journey.type];
  const status = statusMeta[journey.status];
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Icon name={type.icon} size={34} />
        <View style={styles.flex}>
          <AppText variant="subheading">{type.label}</AppText>
          <AppText variant="caption" color="textMuted">
            #{journey.id}
          </AppText>
        </View>
        <View style={styles.right}>
          <AppText variant="title" style={styles.money}>
            {formatMoney(payout(journey))}
          </AppText>
          <AppText variant="caption" color="textMuted">
            Est. {journey.estMinutes} min
          </AppText>
        </View>
      </View>
      <View style={[styles.row, styles.spread]}>
        <Badge label={status.label} tone={status.tone} />
        <View style={styles.more}>
          <AppText variant="label">Show more</AppText>
          <Icon name="chevron-right" size={16} />
        </View>
      </View>
    </View>
  );
}

/** Small card with the updated pickup time, old time struck through. */
export function AiTimeChangeCard({ journey, from, to }: { journey: Journey; from: string; to: string }) {
  const type = journeyTypeMeta[journey.type];
  return (
    <View style={[styles.card, styles.compact]}>
      <View style={styles.row}>
        <Icon name={type.icon} size={30} />
        <View style={styles.flex}>
          <AppText variant="subheading">{type.label}</AppText>
          <AppText variant="caption" color="textMuted">
            #{journey.id}
          </AppText>
        </View>
        <View style={styles.right}>
          <View style={styles.timeRow}>
            <Icon name="clock-time-four-outline" size={22} />
            <AppText variant="title" style={styles.money}>
              {to}
            </AppText>
          </View>
          <AppText variant="body" color="textMuted" style={styles.strike}>
            {from}
          </AppText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(12,12,14,0.94)',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    gap: 12,
  },
  compact: { alignSelf: 'flex-start', width: '78%' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  spread: { justifyContent: 'space-between' },
  flex: { flex: 1 },
  right: { alignItems: 'flex-end' },
  money: { fontSize: 22, lineHeight: 28 },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  strike: { textDecorationLine: 'line-through' },
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
