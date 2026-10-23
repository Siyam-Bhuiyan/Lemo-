import { StyleSheet, View } from 'react-native';
import { AppText, Avatar } from '@/components/ui';
import { colors } from '@/theme';
import { ChatMessage } from '@/types';

interface Props {
  message: ChatMessage;
  /** Peer name, used for the small avatar beside incoming messages. */
  peerName: string;
}

/**
 * Driver's POV: the driver is "mine" (right aligned, no avatar);
 * the passenger sits on the left with a small avatar.
 */
export function MessageBubble({ message, peerName }: Props) {
  const mine = message.mine;
  return (
    <View style={[styles.row, mine ? styles.rowMine : styles.rowTheirs]}>
      {!mine ? <Avatar name={peerName} size={28} /> : null}
      <View style={styles.col}>
        <View style={styles.bubble}>
          <AppText variant="body" style={styles.text}>
            {message.text}
          </AppText>
        </View>
        <AppText variant="caption" color="textMuted" style={[styles.time, mine && styles.timeMine]}>
          {message.time}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 6, marginBottom: 14 },
  rowMine: { justifyContent: 'flex-end' },
  rowTheirs: { justifyContent: 'flex-start' },
  col: { maxWidth: '80%' },
  bubble: {
    backgroundColor: colors.bubble,
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#2b2b30',
  },
  text: { fontSize: 16.5, lineHeight: 24 },
  time: { marginTop: 4, marginLeft: 2 },
  timeMine: { textAlign: 'right', marginRight: 2 },
});
