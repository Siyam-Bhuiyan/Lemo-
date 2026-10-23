import * as Clipboard from 'expo-clipboard';
import { Pressable, StyleSheet, View } from 'react-native';
import { AppText, Icon } from '@/components/ui';
import { colors } from '@/theme';
import { Journey } from '@/types';
import { isAirportDropoff, isAirportPickup, journeyTypeMeta } from '../../utils';
import { DateBlock } from '../DateBlock';
import { RouteLine } from '../RouteLine';

/** Journey type / id row + the two stops with the pickup date. */
export function TripSummary({ journey }: { journey: Journey }) {
  const type = journeyTypeMeta[journey.type];
  return (
    <View>
      <View style={styles.meta}>
        <View style={styles.metaItem}>
          <Icon name={type.icon} size={34} />
          <View>
            <AppText variant="subheading">{type.label}</AppText>
            <AppText variant="caption" color="textMuted">
              Journey Type
            </AppText>
          </View>
        </View>
        <Pressable style={styles.metaItem} onPress={() => Clipboard.setStringAsync(`#${journey.id}`)}>
          <Icon name="tag-outline" size={34} />
          <View>
            <View style={styles.idRow}>
              <AppText variant="subheading">#{journey.id}</AppText>
              <Icon name="content-copy" size={14} color={colors.textMuted} />
            </View>
            <AppText variant="caption" color="textMuted">
              Journey ID
            </AppText>
          </View>
        </Pressable>
      </View>

      <View style={styles.route}>
        <RouteLine
          large
          fromName={journey.pickup.name}
          fromAddress={journey.pickup.address}
          toName={journey.dropoff.name}
          toAddress={journey.dropoff.address}
          fromIcon={isAirportPickup(journey) ? 'airplane-landing' : 'map-marker-outline'}
          toIcon={isAirportDropoff(journey) ? 'airplane-takeoff' : 'map-marker'}
        />
        <DateBlock filled month={journey.month} day={journey.day} time={journey.time} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  meta: { flexDirection: 'row', justifyContent: 'space-between' },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  idRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  route: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 24 },
});
