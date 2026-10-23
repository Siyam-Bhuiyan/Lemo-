import { Pressable, StyleSheet, View } from 'react-native';
import { AppText, Icon } from '@/components/ui';
import { colors } from '@/theme';
import { AppNotification } from '@/types';
import { kindMeta } from '../meta';

/** Renders the body with the journey id picked out in bold white. */
function Body({ text, highlight }: { text: string; highlight?: string }) {
  if (!highlight || !text.includes(highlight)) {
    return (
      <AppText variant="body" color="textMuted" numberOfLines={2}>
        {text}
      </AppText>
    );
  }
  const [before, after] = text.split(highlight);
  return (
    <AppText variant="body" color="textMuted" numberOfLines={2}>
      {before}
      <AppText variant="bodyStrong">{highlight}</AppText>
      {after}
    </AppText>
  );
}

interface Props {
  item: AppNotification;
  last?: boolean;
  onPress: (item: AppNotification) => void;
}

export function NotificationItem({ item, last, onPress }: Props) {
  const meta = kindMeta[item.kind];
  return (
    <Pressable
      onPress={() => onPress(item)}
      style={({ pressed }) => [styles.row, !last && styles.divider, pressed && { opacity: 0.7 }]}
    >
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
    </Pressable>
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
