import { Pressable, StyleSheet } from 'react-native';
import { AppText, Icon } from '@/components/ui';
import { colors, radius } from '@/theme';

interface Props {
  title: string;
  time: string;
  onPress?: () => void;
}

export function RecentChatRow({ title, time, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && { opacity: 0.75 }]}>
      <Icon name="history" size={24} color={colors.textMuted} />
      <AppText variant="body" numberOfLines={1} style={styles.title}>
        {title}
      </AppText>
      <AppText variant="caption" color="textMuted">
        {time}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    height: 54,
    marginBottom: 10,
    borderRadius: radius.md,
    backgroundColor: 'rgba(40,40,44,0.35)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  title: { flex: 1, fontSize: 15 },
});
