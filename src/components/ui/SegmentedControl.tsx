import { Pressable, StyleSheet, View } from 'react-native';
import { colors } from '@/theme';
import { AppText } from './AppText';

interface Props<T extends string> {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}

/** Pill-shaped switcher with a white active thumb. */
export function SegmentedControl<T extends string>({ options, value, onChange }: Props<T>) {
  return (
    <View style={styles.track}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <Pressable key={o.value} style={[styles.item, active && styles.active]} onPress={() => onChange(o.value)}>
            <AppText variant="subheading" color={active ? '#000' : 'text'} weight="Figtree_500Medium">
              {o.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flex: 1,
    height: 56,
    flexDirection: 'row',
    padding: 5,
    borderRadius: 28,
    backgroundColor: 'rgba(16,16,18,0.95)',
    borderWidth: 1,
    borderColor: colors.border,
  },
  item: { flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 24 },
  active: { backgroundColor: '#fff' },
});
