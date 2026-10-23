import { ReactNode } from 'react';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { colors, radius } from '@/theme';
import { AppText } from './AppText';
import { Icon, IconName } from './Icon';

type Variant = 'light' | 'danger' | 'ghost';

const palette: Record<Variant, { bg: string; fg: string; border?: string }> = {
  light: { bg: colors.buttonLight, fg: colors.buttonLightText },
  danger: { bg: colors.redSoft, fg: colors.redText },
  ghost: { bg: colors.surfaceRaised, fg: colors.text, border: colors.border },
};

interface Props {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  icon?: IconName;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

export function Button({ label, onPress, variant = 'light', icon, style }: Props) {
  const { bg, fg, border } = palette[variant];
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: bg, borderColor: border ?? 'transparent', opacity: pressed ? 0.8 : 1 },
        style,
      ]}
    >
      {icon ? <Icon name={icon} size={20} color={fg} /> : null}
      <AppText variant="subheading" color={fg} weight="Figtree_500Medium">
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
});
