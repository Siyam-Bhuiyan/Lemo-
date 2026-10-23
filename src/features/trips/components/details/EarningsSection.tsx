import { StyleSheet, View } from 'react-native';
import { AppText, Badge, Card, Icon } from '@/components/ui';
import { colors, radius } from '@/theme';
import { Journey } from '@/types';
import { feeAmount, formatMoney, payout } from '../../utils';

function Line({ label, value, negative }: { label: string; value: string; negative?: boolean }) {
  return (
    <View style={styles.line}>
      <AppText variant="body" color="textMuted">
        {label}
      </AppText>
      <AppText variant="body" color={negative ? colors.redText : 'text'}>
        {value}
      </AppText>
    </View>
  );
}

/** Driver's earnings breakdown for a journey, plus where the payout lands. */
export function EarningsSection({ journey }: { journey: Journey }) {
  const paid = journey.status === 'completed';
  return (
    <View style={styles.wrap}>
      <View style={styles.titleRow}>
        <AppText variant="label" color="textMuted" style={styles.title}>
          EARNINGS DETAILS
        </AppText>
        <View style={styles.rule} />
        <View style={styles.status}>
          <AppText variant="label">{paid ? 'PAID' : 'PENDING'}</AppText>
        </View>
      </View>

      <Line label="Base Fare" value={formatMoney(journey.baseFare)} />
      <Line
        label={`Platform Fee (${journey.platformFeePercent}%)`}
        value={`-${formatMoney(feeAmount(journey))}`}
        negative
      />
      <View style={styles.totalRow}>
        <AppText variant="subheading" style={styles.total}>
          Your Payout
        </AppText>
        <AppText variant="subheading" style={styles.total}>
          {formatMoney(payout(journey))}
        </AppText>
      </View>

      <Card style={styles.method}>
        <View style={styles.bank}>
          <Icon name="bank" size={26} color="#1a3a8f" />
        </View>
        <View style={styles.methodText}>
          <AppText variant="bodyStrong">**** 6789</AppText>
          <AppText variant="caption" color="textMuted">
            Instant payout · Chase Bank
          </AppText>
        </View>
        <Badge label="Active" tone="green" />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 12 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 4 },
  title: { letterSpacing: 0.4 },
  rule: { flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: colors.border },
  status: { backgroundColor: colors.surfaceRaised, paddingHorizontal: 12, paddingVertical: 5, borderRadius: radius.sm },
  line: { flexDirection: 'row', justifyContent: 'space-between' },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    paddingTop: 10,
  },
  total: { fontSize: 18 },
  method: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 14, marginTop: 4 },
  bank: { width: 54, height: 36, borderRadius: 5, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  methodText: { flex: 1, gap: 1 },
});
