import { StyleSheet, View } from 'react-native';
import { AppText, Icon, IconName } from '@/components/ui';
import { colors } from '@/theme';
import { AppNotification, NotificationKind } from '@/types';

const kindMeta: Record<NotificationKind, { icon: IconName; bg: string }> = {
  request: { icon: 'car-arrow-right', bg: '#f59e0b' },
  reminder: { icon: 'car-clock', bg: '#f59e0b' },
  passengerMessage: { icon: 'message-processing-outline', bg: '#eab308' },
  passengerArrived: { icon: 'flag-outline', bg: '#06b6d4' },
  completed: { icon: 'map-marker-check-outline', bg: '#16a34a' },
  payout: { icon: 'credit-card-check-outline', bg: '#16a34a' },
  rating: { icon: 'star-outline', bg: '#8b5cf6' },
  cancelled: { icon: 'close-circle-outline', bg: '#ef4444' },
};

/** Renders the body with the journey id picked out in bold white. */
function Body({ text, highlight }: { text: string; highlight?: string }) {
  if (!highlight || !text.includes(highlight)) {
    return (
      <AppText variant="body" color="textMuted">
        {text}
      </AppText>
    );
  }
  const [before, after] = text.split(highlight);
  return (
    <AppText variant="body" color="textMuted">
      {before}
      <AppText variant="bodyStrong">{highlight}</AppText>
      {after}
    </AppText>
  );
}

export function NotificationItem({ item, last }: { item: AppNotification; last?: boolean }) {
  const meta = kindMeta[item.kind];
  return (
    <View style={[styles.row, !last && styles.divider]}>
      <View style={[styles.icon, { backgroundColor: meta.bg }]}>
        <Icon name={meta.icon} size={30} color="#fff" />
      </View>
      <View style={styles.body}>
        <AppText variant="subheading" style={styles.title}>
          {item.title}
        </AppText>
        <Body text={item.body} highlight={item.highlight} />
      </View>
      <View style={styles.meta}>
        <AppText variant="label" color="textMuted" weight="Figtree_400Regular">
          {item.time}
        </AppText>
        {item.unread ? <View style={styles.dot} /> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 14, paddingVertical: 16, alignItems: 'flex-start' },
  divider: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  icon: { width: 56, height: 56, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  body: { flex: 1, gap: 3 },
  title: { fontSize: 18, fontFamily: 'Figtree_500Medium' },
  meta: { alignItems: 'flex-end', justifyContent: 'space-between', alignSelf: 'stretch' },
  dot: { width: 14, height: 14, borderRadius: 7, backgroundColor: colors.gold, marginBottom: 6, marginRight: 2 },
});
