import { StyleSheet, View } from 'react-native';
import { AppText, Icon, IconName } from '@/components/ui';
import { colors } from '@/theme';
import { JourneyPreferences } from '@/types';

interface Item {
  icon: IconName;
  value: string;
  label: string;
  muted?: boolean;
}

const buildItems = (p: JourneyPreferences): Item[] => [
  { icon: 'account-multiple-outline', value: String(p.passengers), label: 'Passenger' },
  { icon: 'bag-personal-outline', value: String(p.carryOnBags), label: 'Carry-on Bags' },
  { icon: 'bag-suitcase-outline', value: String(p.largeBags), label: 'Large Bags' },
  { icon: 'car-child-seat', value: p.childSeat ?? 'No Need', label: 'Child Seat', muted: !p.childSeat },
  { icon: 'wheelchair-accessibility', value: p.accessible ? 'Yes' : 'No Need', label: 'Accessible Veh.', muted: !p.accessible },
  { icon: 'paw', value: p.petFriendly ? 'Yes' : 'No Need', label: 'Pet Friendly', muted: !p.petFriendly },
];

export function PreferencesGrid({ preferences }: { preferences: JourneyPreferences }) {
  return (
    <View style={styles.grid}>
      {buildItems(preferences).map((item) => (
        <View key={item.label} style={styles.cell}>
          <Icon name={item.icon} size={28} color={item.muted ? colors.textFaint : colors.text} />
          <View style={styles.texts}>
            <AppText variant="subheading" color={item.muted ? 'textFaint' : 'text'} style={styles.value} numberOfLines={1}>
              {item.value}
            </AppText>
            <AppText variant="caption" color="textMuted" numberOfLines={1}>
              {item.label}
            </AppText>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', rowGap: 22 },
  cell: { width: '33.33%', flexDirection: 'row', alignItems: 'center', gap: 8 },
  texts: { flex: 1 },
  value: { fontSize: 17 },
});
