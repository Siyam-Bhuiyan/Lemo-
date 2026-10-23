import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { AppText, Icon } from '@/components/ui';
import { colors } from '@/theme';
import { MenuSectionData } from '../menu';

export function MenuSection({ section }: { section: MenuSectionData }) {
  return (
    <View style={styles.section}>
      <AppText variant="overline" color="textFaint" style={styles.title}>
        {section.title}
      </AppText>
      {section.items.map((item) => (
        <Pressable
          key={item.label}
          onPress={() => item.href && router.push(item.href)}
          style={({ pressed }) => [styles.row, pressed && { opacity: 0.6 }]}
        >
          <Icon name={item.icon} size={26} />
          <AppText variant="body" style={styles.label}>
            {item.label}
          </AppText>
          <Icon name="chevron-right" size={22} />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: 22 },
  title: { marginBottom: 6, marginLeft: 2, color: colors.textFaint },
  row: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 13, paddingHorizontal: 6 },
  label: { flex: 1, fontSize: 16.5, fontFamily: 'Figtree_500Medium' },
});
