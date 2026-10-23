import { StyleSheet, Switch, View } from 'react-native';
import { AppText, Card, Icon } from '@/components/ui';
import { useDriverStatus } from '@/context/DriverStatusContext';
import { colors } from '@/theme';

/** Online / offline control — the driver's counterpart to the passenger "Where are you going?" card. */
export function StatusCard() {
  const { online, setOnline } = useDriverStatus();
  return (
    <Card style={styles.card}>
      <Icon name={online ? 'map-marker-radius-outline' : 'map-marker-off-outline'} size={30} />
      <View style={styles.texts}>
        <AppText variant="heading" style={styles.title}>
          {online ? "You're Online" : "You're Offline"}
        </AppText>
        <AppText variant="body" color="textMuted">
          {online ? 'Ready to receive journeys' : 'Go online to receive journeys'}
        </AppText>
      </View>
      <Switch
        value={online}
        onValueChange={setOnline}
        trackColor={{ false: '#2a2a2e', true: colors.gold }}
        thumbColor="#fff"
        ios_backgroundColor="#2a2a2e"
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 18 },
  texts: { flex: 1, gap: 2 },
  title: { fontSize: 17 },
});
