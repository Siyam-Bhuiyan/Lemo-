import { StyleSheet, View } from 'react-native';
import { AppText, Icon, IconName } from '@/components/ui';
import { colors } from '@/theme';

interface Props {
  fromName: string;
  toName: string;
  fromIcon: IconName;
  toIcon: IconName;
  fromAddress?: string;
  toAddress?: string;
  /** Larger type + addresses, used on the details screen. */
  large?: boolean;
}

/** Two stops joined by a thin gold connector. */
export function RouteLine({ fromName, toName, fromIcon, toIcon, fromAddress, toAddress, large }: Props) {
  const nameSize = large ? 19 : 16;
  return (
    <View style={styles.row}>
      <View style={styles.rail}>
        <Icon name={fromIcon} size={large ? 22 : 20} color={large ? colors.text : colors.text} />
        <View style={styles.connector} />
        <Icon name={toIcon} size={large ? 22 : 20} color={colors.gold} />
      </View>
      <View style={styles.texts}>
        <View style={styles.stop}>
          <AppText variant="subheading" numberOfLines={1} style={{ fontSize: nameSize }}>
            {fromName}
          </AppText>
          {fromAddress ? (
            <AppText variant="caption" color="textMuted" numberOfLines={1}>
              {fromAddress}
            </AppText>
          ) : null}
        </View>
        <View style={styles.stop}>
          <AppText variant="subheading" numberOfLines={1} style={{ fontSize: nameSize }}>
            {toName}
          </AppText>
          {toAddress ? (
            <AppText variant="caption" color="textMuted" numberOfLines={1}>
              {toAddress}
            </AppText>
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 12, flex: 1 },
  rail: { alignItems: 'center', paddingTop: 2, paddingBottom: 4 },
  connector: { flex: 1, width: 1.5, backgroundColor: colors.gold, marginVertical: 3, opacity: 0.8 },
  texts: { flex: 1, justifyContent: 'space-between', gap: 14 },
  stop: { gap: 2 },
});
