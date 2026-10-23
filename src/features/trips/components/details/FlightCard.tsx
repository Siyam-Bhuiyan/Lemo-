import { StyleSheet, View } from 'react-native';
import { AppText, Badge, Card, Icon } from '@/components/ui';
import { colors } from '@/theme';
import { FlightInfo } from '@/types';

export function FlightCard({ flight }: { flight: FlightInfo }) {
  return (
    <Card style={styles.card}>
      <View style={styles.top}>
        <View style={styles.arrival}>
          <Icon name="airplane-landing" size={40} />
          <AppText variant="label" color="textMuted">
            Arrival
          </AppText>
        </View>
        <View style={styles.rule} />
        <View style={styles.flex}>
          <View style={styles.row}>
            <AppText variant="heading" style={styles.flightName}>
              {flight.airline}
            </AppText>
            <View style={styles.code}>
              <AppText variant="label">{flight.code}</AppText>
            </View>
          </View>
          <View style={styles.row}>
            <AppText variant="body" color="textMuted">
              {flight.from}
            </AppText>
            <Icon name="arrow-right" size={16} color={colors.textMuted} />
            <AppText variant="body" color="textMuted">
              {flight.to}
            </AppText>
          </View>
        </View>
        <View style={styles.status}>
          <Badge label={flight.status} tone="blue" />
          <View style={styles.row}>
            <Icon name="timer-outline" size={18} color={colors.green} />
            <AppText variant="label" color="green">
              {flight.onTime ? 'On Time' : 'Delayed'}
            </AppText>
          </View>
        </View>
      </View>
      <View style={styles.bottom}>
        <AppText variant="body" color="textMuted">
          Arriving: <AppText variant="bodyStrong">{flight.arrivingAt}</AppText>
        </AppText>
        <AppText variant="body" color="textMuted">
          Pickup From: <AppText variant="bodyStrong">{flight.pickupFrom}</AppText>
        </AppText>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { padding: 14, gap: 12, backgroundColor: 'rgba(24,22,12,0.7)' },
  top: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  arrival: { alignItems: 'center', gap: 2, width: 64 },
  rule: { width: StyleSheet.hairlineWidth, alignSelf: 'stretch', backgroundColor: colors.border },
  flex: { flex: 1, gap: 4 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  flightName: { fontSize: 18 },
  code: { backgroundColor: colors.surfaceRaised, paddingHorizontal: 7, paddingVertical: 2, borderRadius: 5 },
  status: { alignItems: 'flex-end', gap: 10 },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    paddingTop: 10,
  },
});
