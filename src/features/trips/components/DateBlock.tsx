import { StyleSheet, View } from 'react-native';
import { AppText } from '@/components/ui';
import { colors, radius } from '@/theme';

interface Props {
  month: string;
  day: string;
  time: string;
  filled?: boolean;
}

export function DateBlock({ month, day, time, filled }: Props) {
  return (
    <View style={[styles.box, filled && styles.filled]}>
      <AppText variant="label" color="textMuted">
        {month}
      </AppText>
      <AppText variant="display" style={styles.day}>
        {day}
      </AppText>
      <AppText variant="label" color="text" weight="Figtree_400Regular">
        {time}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { alignItems: 'center', paddingHorizontal: 6, minWidth: 74 },
  filled: {
    backgroundColor: 'rgba(24,24,27,0.95)',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  day: { fontSize: 32, lineHeight: 36 },
});
