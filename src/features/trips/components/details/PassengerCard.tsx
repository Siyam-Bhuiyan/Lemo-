import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { AppText, Avatar, Icon, IconButton } from '@/components/ui';
import { colors, radius } from '@/theme';
import { Journey } from '@/types';

/** Driver-side counterpart of "Chauffeur & Vehicle": who they're picking up, with quick contact actions. */
export function PassengerCard({ journey }: { journey: Journey }) {
  const { passenger } = journey;
  return (
    <View style={styles.card}>
      <Avatar name={passenger.name} size={48} />
      <View style={styles.texts}>
        <AppText variant="subheading" style={styles.name}>
          {passenger.name}
        </AppText>
        <View style={styles.row}>
          <Icon name="star" size={14} color={colors.gold} />
          <AppText variant="caption" color="textMuted">
            {passenger.rating}/5 · Passenger
          </AppText>
        </View>
      </View>
      <IconButton icon="phone-outline" size={42} />
      <IconButton
        icon="message-text-outline"
        size={42}
        onPress={() => router.push({ pathname: '/chat/[id]', params: { id: journey.id } })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: radius.md,
    backgroundColor: 'rgba(30,26,12,0.75)',
  },
  texts: { flex: 1, gap: 2 },
  name: { fontSize: 17 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 4 },
});
