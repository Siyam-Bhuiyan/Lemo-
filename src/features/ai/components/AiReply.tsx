import { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { AppText } from '@/components/ui';
import { colors } from '@/theme';
import { AiAvatar } from './AiAvatar';

interface Props {
  children: ReactNode;
  time?: string;
  footer?: ReactNode;
}

/** An AI message: small avatar on the left, a card with a gold "Limo AI" label. */
export function AiReply({ children, time, footer }: Props) {
  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <AiAvatar size={30} />
        <View style={styles.bubble}>
          <AppText variant="bodyStrong" color="gold" style={styles.name}>
            Limo AI
          </AppText>
          {children}
        </View>
      </View>
      {footer}
      {time ? (
        <AppText variant="caption" color="textMuted" style={styles.time}>
          {time}
        </AppText>
      ) : null}
    </View>
  );
}

interface ActionsProps {
  confirmed: boolean;
  onConfirm: () => void;
}

export function ConfirmActions({ confirmed, onConfirm }: ActionsProps) {
  return (
    <View style={styles.actions}>
      <View style={[styles.btn, styles.dim]}>
        <AppText variant="bodyStrong" color={confirmed ? '#4a4a50' : 'textMuted'}>
          Change
        </AppText>
      </View>
      <Pressable onPress={onConfirm} disabled={confirmed} style={[styles.btn, styles.primary, confirmed && { opacity: 0.55 }]}>
        <AppText variant="bodyStrong" color="#111">
          Confirmed
        </AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 16, gap: 8 },
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 6 },
  bubble: {
    flex: 1,
    maxWidth: '92%',
    backgroundColor: colors.bubble,
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2b2b30',
    gap: 4,
  },
  name: { fontSize: 17 },
  time: { marginLeft: 36 },
  actions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10, marginTop: 10 },
  btn: { height: 40, minWidth: 110, borderRadius: 8, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
  dim: { backgroundColor: 'rgba(255,255,255,0.05)' },
  primary: { backgroundColor: '#fff' },
});
