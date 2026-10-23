import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { BottomTabBarProps } from 'expo-router/js-tabs';
import { useState } from 'react';
import { LayoutChangeEvent, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText, Icon, IconName } from '@/components/ui';
import { useDriverStatus } from '@/context/DriverStatusContext';
import { colors } from '@/theme';
import { GlassBubble } from './GlassBubble';

interface TabMeta {
  label: string;
  icon: IconName;
  iconActive: IconName;
}

const TABS: Record<string, TabMeta> = {
  index: { label: 'Home', icon: 'home-outline', iconActive: 'home' },
  trips: { label: 'Journeys', icon: 'car-side', iconActive: 'car-side' },
  messages: { label: 'Messages', icon: 'message-text-outline', iconActive: 'message-text' },
  profile: { label: 'Profile', icon: 'account-outline', iconActive: 'account' },
};

const ORDER = ['index', 'trips', 'messages', 'profile'];
const CENTER_GAP = 70;
const BUBBLE_INSET = 2;

/** Frosted-glass floating bar with a sliding highlight bubble and a centre online/offline button. */
export function TabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { online, toggle } = useDriverStatus();
  const [barWidth, setBarWidth] = useState(0);
  const activeName = state.routes[state.index]?.name;
  const activeSlot = Math.max(0, ORDER.indexOf(activeName));

  const tabWidth = barWidth ? (barWidth - CENTER_GAP) / 4 : 0;
  const slotX = (slot: number) => (slot < 2 ? slot * tabWidth : 2 * tabWidth + CENTER_GAP + (slot - 2) * tabWidth);

  const onLayout = (e: LayoutChangeEvent) => setBarWidth(e.nativeEvent.layout.width);

  const renderTab = (name: string) => {
    const meta = TABS[name];
    const route = state.routes.find((r) => r.name === name);
    if (!meta || !route) return null;
    const focused = activeName === name;
    const tint = focused ? colors.accent : 'rgba(255,255,255,0.85)';

    const onPress = () => {
      const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
      if (!focused && !event.defaultPrevented) {
        Haptics.selectionAsync();
        navigation.navigate(route.name);
      }
    };

    return (
      <Pressable key={name} onPress={onPress} style={styles.tab} accessibilityRole="button">
        <Icon name={focused ? meta.iconActive : meta.icon} size={25} color={tint} />
        <AppText variant="label" color={tint} style={styles.label}>
          {meta.label}
        </AppText>
      </Pressable>
    );
  };

  return (
    <View style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, 10) }]} pointerEvents="box-none">
      <View style={styles.shadow}>
        <View style={styles.bar} onLayout={onLayout}>
          <BlurView intensity={90} tint="dark" experimentalBlurMethod="dimezisBlurView" style={StyleSheet.absoluteFill} />
          <LinearGradient
            colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.01)']}
            style={StyleSheet.absoluteFill}
            pointerEvents="none"
          />
          {tabWidth > 0 ? <GlassBubble x={slotX(activeSlot) + BUBBLE_INSET} width={tabWidth - BUBBLE_INSET * 2} /> : null}
          <View style={styles.row}>
            {ORDER.slice(0, 2).map(renderTab)}
            <View style={{ width: CENTER_GAP }} />
            {ORDER.slice(2).map(renderTab)}
          </View>
        </View>
      </View>

      <Pressable
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          toggle();
        }}
        style={({ pressed }) => [styles.fabHalo, pressed && { transform: [{ scale: 0.94 }] }]}
        accessibilityLabel={online ? 'Go offline' : 'Go online'}
      >
        <View style={[styles.fab, !online && styles.fabOffline]}>
          <Icon name="power" size={32} color={online ? '#111' : colors.textMuted} />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', left: 0, right: 0, bottom: 0, paddingHorizontal: 14 },
  shadow: {
    borderRadius: 28,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 14,
  },
  bar: {
    height: 70,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: 'rgba(16,16,20,0.9)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  row: { ...StyleSheet.absoluteFill, flexDirection: 'row', alignItems: 'center' },
  tab: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 2, height: '100%' },
  label: { fontSize: 12 },
  fabHalo: {
    position: 'absolute',
    alignSelf: 'center',
    top: -28,
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: 'rgba(22,22,26,0.92)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.accent,
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 16,
  },
  fab: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabOffline: { backgroundColor: '#2a2a2e' },
});
