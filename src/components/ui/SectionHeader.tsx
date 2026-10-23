import { Pressable, StyleSheet, View } from 'react-native';
import { colors } from '@/theme';
import { AppText } from './AppText';

interface Props {
  title: string;
  /** Plain text shown at the right end of the rule. */
  trailing?: string;
  /** Tappable gold text at the right end of the rule. */
  action?: { label: string; onPress: () => void };
  muted?: boolean;
}

/** Small uppercase title followed by a hairline rule, as used across the app. */
export function SectionHeader({ title, trailing, action, muted = true }: Props) {
  return (
    <View style={styles.row}>
      <AppText variant="label" color={muted ? 'textMuted' : 'text'} style={styles.title}>
        {title}
      </AppText>
      <View style={styles.rule} />
      {trailing ? (
        <AppText variant="caption" color="textMuted">
          {trailing}
        </AppText>
      ) : null}
      {action ? (
        <Pressable onPress={action.onPress} hitSlop={8}>
          <AppText variant="label" color="gold">
            {action.label}
          </AppText>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 22, marginBottom: 12 },
  title: { textTransform: 'uppercase', letterSpacing: 0.4 },
  rule: { flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: colors.border },
});
