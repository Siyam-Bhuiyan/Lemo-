import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { AppText, Avatar, Icon } from '@/components/ui';
import { colors } from '@/theme';

interface Props {
  name: string;
  unread: number;
}

export function HomeHeader({ name, unread }: Props) {
  return (
    <View style={styles.row}>
      <Avatar name={name} size={40} />
      <AppText variant="heading" style={styles.welcome}>
        Welcome, {name}!
      </AppText>
      <Pressable style={styles.bell} onPress={() => router.push('/notifications')} hitSlop={8}>
        <Icon name="bell-outline" size={24} />
        {unread > 0 ? (
          <View style={styles.badge}>
            <AppText variant="caption" style={styles.badgeText}>
              {unread}
            </AppText>
          </View>
        ) : null}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 18 },
  welcome: { flex: 1, fontSize: 18 },
  bell: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    minWidth: 17,
    height: 17,
    borderRadius: 9,
    backgroundColor: colors.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { fontSize: 10.5, lineHeight: 13, fontFamily: 'Figtree_600SemiBold' },
});
