import { StyleSheet, TextInput, View } from 'react-native';
import { Icon } from '@/components/ui';
import { colors, fonts, radius } from '@/theme';

interface Props {
  firstName: string;
  lastName: string;
  onChangeFirst: (v: string) => void;
  onChangeLast: (v: string) => void;
}

/** First + last name sharing a single input container, split by a divider. */
export function NameFields({ firstName, lastName, onChangeFirst, onChangeLast }: Props) {
  return (
    <View style={styles.field}>
      <Icon name="account-outline" size={22} />
      <TextInput
        value={firstName}
        onChangeText={onChangeFirst}
        placeholder="First name"
        placeholderTextColor={colors.textFaint}
        selectionColor={colors.gold}
        style={styles.input}
      />
      <View style={styles.divider} />
      <TextInput
        value={lastName}
        onChangeText={onChangeLast}
        placeholder="Last name"
        placeholderTextColor={colors.textFaint}
        selectionColor={colors.gold}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 16,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceInput,
  },
  input: { flex: 1, color: colors.text, fontFamily: fonts.regular, fontSize: 16, height: '100%' },
  divider: { width: 1, height: 28, backgroundColor: colors.border },
});
