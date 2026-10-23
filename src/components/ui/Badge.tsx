import { StyleSheet, View } from 'react-native';
import { colors, radius } from '@/theme';
import { AppText } from './AppText';

export type BadgeTone = 'blue' | 'green' | 'orange' | 'purple' | 'red' | 'gold';

const tones: Record<BadgeTone, { bg: string; fg: string }> = {
  blue: { bg: colors.blueSoft, fg: colors.blue },
  green: { bg: colors.greenSoft, fg: colors.green },
  orange: { bg: colors.orangeSoft, fg: colors.orange },
  purple: { bg: colors.purpleSoft, fg: '#8f78ff' },
  red: { bg: 'rgba(239,68,68,0.16)', fg: colors.redText },
  gold: { bg: colors.goldSoft, fg: colors.gold },
};

interface Props {
  label: string;
  tone?: BadgeTone;
}

export function Badge({ label, tone = 'blue' }: Props) {
  const { bg, fg } = tones[tone];
  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <AppText variant="label" color={fg} style={styles.text}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: radius.sm, alignSelf: 'flex-start' },
  text: { fontSize: 13 },
});
