import { ReactNode } from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { colors, fonts, radius } from '@/theme';
import { Icon, IconName } from './Icon';

interface Props extends TextInputProps {
  icon: IconName;
  /** Rendered between the icon and the input, e.g. a country picker. */
  prefix?: ReactNode;
}

export function TextField({ icon, prefix, style, ...rest }: Props) {
  return (
    <View style={styles.field}>
      <Icon name={icon} size={22} color={colors.text} />
      {prefix}
      <TextInput
        {...rest}
        placeholderTextColor={colors.textFaint}
        selectionColor={colors.gold}
        style={[styles.input, style]}
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
});
