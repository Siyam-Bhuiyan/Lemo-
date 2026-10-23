import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { AppText, Avatar, Icon } from '@/components/ui';
import { colors, radius } from '@/theme';
import { ChatThread } from '@/types';

export function ThreadCard({ thread, highlighted }: { thread: ChatThread; highlighted?: boolean }) {
  const open = () => router.push({ pathname: '/chat/[id]', params: { id: thread.id } });
  const idTone = thread.support ? colors.green : colors.blue;
  const idBg = thread.support ? colors.greenSoft : colors.blueSoft;

  return (
    <Pressable onPress={open} style={[styles.card, highlighted && styles.highlight]}>
      <View style={styles.top}>
        {thread.support ? (
          <View style={styles.support}>
            <Icon name="headset" size={30} />
          </View>
        ) : (
          <Avatar name={thread.title} size={54} online={thread.online} ring />
        )}
        <View style={styles.body}>
          <View style={styles.titleRow}>
            <AppText variant="heading" numberOfLines={1} style={styles.title}>
              {thread.title}
            </AppText>
            {thread.journeyId ? (
              <View style={[styles.idChip, { backgroundColor: idBg }]}>
                <AppText variant="label" color={idTone}>
                  #{thread.journeyId}
                </AppText>
              </View>
            ) : null}
          </View>
          <AppText variant="body" color="textMuted" numberOfLines={1} style={styles.preview}>
            {thread.lastMessage}
          </AppText>
        </View>
        <View style={styles.meta}>
          {thread.unread > 0 ? (
            <View style={styles.unread}>
              <AppText variant="label" style={styles.unreadText}>
                {thread.unread}
              </AppText>
            </View>
          ) : (
            <View style={styles.unreadSpacer} />
          )}
          <AppText variant="label" color="textMuted" weight="Figtree_400Regular">
            {thread.time}
          </AppText>
        </View>
      </View>

      {thread.arrivingInMin || thread.statusLabel ? (
        <View style={styles.bottom}>
          <Icon name="car-side" size={20} color={thread.arrivingInMin ? colors.textMuted : colors.text} />
          <AppText variant="body" color={thread.arrivingInMin ? 'textMuted' : 'text'} style={styles.status}>
            {thread.arrivingInMin ? 'Pickup in ' : thread.statusLabel}
            {thread.arrivingInMin ? (
              <AppText variant="bodyStrong">{thread.arrivingInMin} min</AppText>
            ) : null}
          </AppText>
          <View style={styles.viewBtn}>
            <AppText variant="label">View Journey</AppText>
            <Icon name="chevron-right" size={16} />
          </View>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(16,16,19,0.96)',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: 'transparent',
    padding: 14,
    marginBottom: 12,
    gap: 12,
  },
  highlight: { borderColor: colors.border },
  top: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  support: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#22a851',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: { flex: 1, gap: 4 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  title: { flexShrink: 1 },
  idChip: { paddingHorizontal: 9, paddingVertical: 3, borderRadius: 6 },
  preview: { fontSize: 14 },
  meta: { alignItems: 'flex-end', justifyContent: 'space-between', alignSelf: 'stretch', paddingVertical: 2 },
  unread: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#ff3b3b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadText: { fontFamily: 'Figtree_600SemiBold' },
  unreadSpacer: { height: 26 },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    paddingTop: 10,
  },
  status: { flex: 1 },
  viewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.surfaceRaised,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: radius.sm,
  },
});
