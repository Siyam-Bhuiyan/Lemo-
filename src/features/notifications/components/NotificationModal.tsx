import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useCallback, useEffect, useRef } from 'react';
import { Animated, Modal, Pressable, StyleSheet, View } from 'react-native';
import { AppText, Button, Icon, IconName } from '@/components/ui';
import { colors } from '@/theme';
import { AppNotification } from '@/types';
import { actionFor, journeyIdOf, kindMeta } from '../meta';

interface Props {
  notification: AppNotification | null;
  onClose: () => void;
}

function InfoTile({ icon, label, value }: { icon: IconName; label: string; value: string }) {
  return (
    <View style={styles.tile}>
      <Icon name={icon} size={20} color={colors.textMuted} />
      <View style={styles.flex}>
        <AppText variant="caption" color="textMuted">
          {label}
        </AppText>
        <AppText variant="bodyStrong" numberOfLines={1}>
          {value}
        </AppText>
      </View>
    </View>
  );
}

/** Centred dialog showing the full notification, with a pop-in animation and blurred backdrop. */
export function NotificationModal({ notification, onClose }: Props) {
  const progress = useRef(new Animated.Value(0)).current;
  const meta = notification ? kindMeta[notification.kind] : null;
  const action = notification ? actionFor(notification) : null;
  const journeyId = notification ? journeyIdOf(notification) : undefined;

  useEffect(() => {
    if (!notification) return;
    progress.setValue(0);
    Animated.spring(progress, { toValue: 1, useNativeDriver: true, damping: 15, stiffness: 180 }).start();
  }, [notification, progress]);

  const dismiss = useCallback(
    (after?: () => void) => {
      Animated.timing(progress, { toValue: 0, duration: 140, useNativeDriver: true }).start(() => {
        onClose();
        after?.();
      });
    },
    [onClose, progress],
  );

  const runAction = () => {
    if (!action || !journeyId) return;
    dismiss(() =>
      router.push(
        action.route === 'trip'
          ? { pathname: '/trip/[id]', params: { id: journeyId } }
          : { pathname: '/chat/[id]', params: { id: journeyId } },
      ),
    );
  };

  const cardStyle = {
    opacity: progress,
    transform: [{ scale: progress.interpolate({ inputRange: [0, 1], outputRange: [0.88, 1] }) }],
  };

  return (
    <Modal visible={!!notification} transparent animationType="none" onRequestClose={() => dismiss()} statusBarTranslucent>
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: progress }]}>
        <BlurView intensity={35} tint="dark" experimentalBlurMethod="dimezisBlurView" style={StyleSheet.absoluteFill} />
        <View style={[StyleSheet.absoluteFill, styles.dim]} />
      </Animated.View>
      <Pressable style={StyleSheet.absoluteFill} onPress={() => dismiss()} />

      {notification && meta ? (
        <View style={styles.center} pointerEvents="box-none">
          <Animated.View style={[styles.card, cardStyle]}>
            <LinearGradient colors={['#1b1b20', '#0e0e11']} style={StyleSheet.absoluteFill} />
            <LinearGradient colors={[`${meta.bg}55`, `${meta.bg}00`]} style={styles.glow} pointerEvents="none" />

            <Pressable style={styles.close} onPress={() => dismiss()} hitSlop={10}>
              <Icon name="close" size={20} />
            </Pressable>

            <View style={styles.hero}>
              <View style={[styles.halo, { backgroundColor: `${meta.bg}26`, borderColor: `${meta.bg}40` }]}>
                <View style={[styles.icon, { backgroundColor: meta.bg }]}>
                  <Icon name={meta.icon} size={36} color="#fff" />
                </View>
              </View>
              <View style={[styles.tag, { backgroundColor: `${meta.bg}26` }]}>
                <AppText variant="label" color={meta.bg}>
                  {meta.category}
                </AppText>
              </View>
              <AppText variant="title" style={styles.title}>
                {notification.title}
              </AppText>
              <AppText variant="body" color="textMuted" style={styles.body}>
                {notification.body}
              </AppText>
            </View>

            <View style={styles.tiles}>
              {journeyId ? <InfoTile icon="tag-outline" label="Journey ID" value={`#${journeyId}`} /> : null}
              <InfoTile icon="clock-outline" label="Received" value={notification.time} />
            </View>

            <View style={styles.actions}>
              {action ? <Button label={action.label} icon={action.icon} onPress={runAction} /> : null}
              <Button label={action ? 'Dismiss' : 'Got it'} variant="ghost" onPress={() => dismiss()} />
            </View>
          </Animated.View>
        </View>
      ) : null}
    </Modal>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  dim: { backgroundColor: 'rgba(0,0,0,0.55)' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 22 },
  card: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    padding: 22,
    gap: 18,
  },
  glow: { position: 'absolute', top: 0, left: 0, right: 0, height: 170 },
  close: {
    position: 'absolute',
    top: 14,
    right: 14,
    zIndex: 2,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hero: { alignItems: 'center', gap: 10, paddingTop: 6 },
  halo: { width: 108, height: 108, borderRadius: 54, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  icon: { width: 76, height: 76, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  tag: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 999, marginTop: 6 },
  title: { fontFamily: 'Figtree_600SemiBold', fontSize: 24, lineHeight: 30, textAlign: 'center' },
  body: { fontSize: 16, lineHeight: 24, textAlign: 'center' },
  tiles: { flexDirection: 'row', gap: 10 },
  tile: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: colors.borderSoft,
  },
  actions: { gap: 10 },
});
