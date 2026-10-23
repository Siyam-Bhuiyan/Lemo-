import { Pressable, StyleSheet, View } from 'react-native';
import { AppText, Icon, IconName } from '@/components/ui';
import { colors, radius } from '@/theme';

interface Action {
  label: string;
  icon: IconName;
}

const ACTIONS: Action[] = [
  { label: 'Earnings', icon: 'cash-multiple' },
  { label: 'Schedule', icon: 'calendar-clock-outline' },
  { label: 'My Vehicle', icon: 'car-estate' },
  { label: 'Documents', icon: 'file-document-outline' },
  { label: 'Support', icon: 'headset' },
];

export function QuickActions({ onPress }: { onPress?: (label: string) => void }) {
  return (
    <View style={styles.row}>
      {ACTIONS.map((a, i) => (
        <Pressable
          key={a.label}
          onPress={() => onPress?.(a.label)}
          style={({ pressed }) => [styles.item, i > 0 && styles.divider, pressed && { opacity: 0.6 }]}
        >
          <Icon name={a.icon} size={26} />
          <AppText variant="caption" style={styles.label} numberOfLines={1}>
            {a.label}
          </AppText>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 14,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(14,14,16,0.9)',
    overflow: 'hidden',
  },
  item: { flex: 1, alignItems: 'center', gap: 6, paddingVertical: 12 },
  divider: { borderLeftWidth: 1, borderLeftColor: colors.border },
  label: { color: colors.textMuted, fontSize: 12 },
});
