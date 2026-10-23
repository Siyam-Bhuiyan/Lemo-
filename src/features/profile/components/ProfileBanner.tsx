import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';
import { AppText, Avatar, Icon } from '@/components/ui';
import { colors, radius } from '@/theme';

interface Props {
  name: string;
  email: string;
}

export function ProfileBanner({ name, email }: Props) {
  return (
    <LinearGradient
      colors={['#2a2a24', '#141a26', '#0b0d12']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.skyline}>
        <Icon name="ferris-wheel" size={74} color="rgba(245,184,0,0.28)" />
        <Icon name="city-variant-outline" size={74} color="rgba(245,184,0,0.22)" />
      </View>
      <Avatar name={name} size={64} online ring />
      <View style={styles.texts}>
        <View style={styles.nameRow}>
          <AppText variant="heading" style={styles.name}>
            {name}
          </AppText>
          <View style={styles.chip}>
            <AppText variant="label" color="blue">
              Driver
            </AppText>
          </View>
        </View>
        <AppText variant="body" color="textMuted">
          {email}
        </AppText>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.borderSoft,
  },
  skyline: { position: 'absolute', right: -6, bottom: -8, flexDirection: 'row' },
  texts: { flex: 1, gap: 3 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  name: { fontSize: 19 },
  chip: { backgroundColor: colors.blueSoft, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 5 },
});
