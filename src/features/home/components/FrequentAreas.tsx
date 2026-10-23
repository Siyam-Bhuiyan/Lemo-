import { StyleSheet, View } from 'react-native';
import { AppText, Icon, IconName, SectionHeader } from '@/components/ui';
import { savedAreas } from '@/data/driver';

export function FrequentAreas() {
  return (
    <View>
      <SectionHeader title="Frequent Areas" />
      <View style={styles.list}>
        {savedAreas.map((a) => (
          <View key={a.id} style={styles.row}>
            <Icon name={a.icon as IconName} size={24} />
            <View style={styles.texts}>
              <AppText variant="bodyStrong">{a.title}</AppText>
              <AppText variant="caption" color="textMuted">
                {a.address}
              </AppText>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  list: { gap: 20, paddingTop: 4 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  texts: { flex: 1, gap: 1 },
});
