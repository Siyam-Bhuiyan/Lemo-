import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, View } from 'react-native';
import { AppText, Icon, IconName } from '@/components/ui';
import { colors, radius } from '@/theme';

interface Big {
  title: string;
  subtitle: string;
  icon: IconName;
  colors: [string, string];
}

interface Small {
  title: string;
  subtitle: string;
  icon: IconName;
  colors: [string, string];
}

const BIG: Big[] = [
  { title: 'Earnings', subtitle: 'Payouts & history', icon: 'chart-line', colors: ['#2b2d31', '#101113'] },
  { title: 'Availability', subtitle: 'Set your weekly hours', icon: 'calendar-clock', colors: ['#2a2820', '#101010'] },
];

const SMALL: Small[] = [
  { title: 'Bonuses', subtitle: '12 trips to go', icon: 'gift-outline', colors: ['#173324', '#0f1712'] },
  { title: 'Referrals', subtitle: 'Earn $50 per driver', icon: 'account-plus-outline', colors: ['#1c2b33', '#10161a'] },
  { title: 'Training', subtitle: 'Tips & guidelines', icon: 'school-outline', colors: ['#33301b', '#16150e'] },
];

export function FeatureCards() {
  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        {BIG.map((b) => (
          <Pressable key={b.title} style={styles.flex}>
            <LinearGradient colors={b.colors} style={styles.big}>
              <View style={styles.bigArt}>
                <Icon name={b.icon} size={84} color="rgba(255,255,255,0.1)" />
              </View>
              <View style={styles.bigText}>
                <View style={styles.bigTitle}>
                  <AppText variant="subheading" style={{ fontSize: 17 }}>
                    {b.title}
                  </AppText>
                  <View style={styles.arrow}>
                    <Icon name="arrow-right" size={16} />
                  </View>
                </View>
                <AppText variant="caption" color="textMuted">
                  {b.subtitle}
                </AppText>
              </View>
            </LinearGradient>
          </Pressable>
        ))}
      </View>
      <View style={styles.row}>
        {SMALL.map((s) => (
          <Pressable key={s.title} style={styles.flex}>
            <LinearGradient colors={s.colors} style={styles.small}>
              <Icon name={s.icon} size={24} />
              <View>
                <AppText variant="label" style={{ fontFamily: 'Figtree_600SemiBold' }}>
                  {s.title}
                </AppText>
                <AppText variant="caption" color="textMuted" style={{ fontSize: 11.5 }}>
                  {s.subtitle}
                </AppText>
              </View>
            </LinearGradient>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 10, marginTop: 20 },
  row: { flexDirection: 'row', gap: 10 },
  flex: { flex: 1 },
  big: {
    height: 104,
    borderRadius: radius.lg,
    padding: 14,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.borderSoft,
  },
  bigArt: { position: 'absolute', top: 6, right: 4 },
  bigText: { gap: 2 },
  bigTitle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  arrow: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  small: {
    height: 98,
    borderRadius: radius.lg,
    padding: 12,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.borderSoft,
  },
});
