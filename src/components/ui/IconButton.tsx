import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '@/theme';
import { Icon, IconName } from './Icon';

interface Props {
  icon: IconName;
  onPress?: () => void;
  size?: number;
  tone?: 'dark' | 'light';
  style?: StyleProp<ViewStyle>;
  badge?: boolean;
}

export function IconButton({ icon, onPress, size = 44, tone = 'dark', style }: Props) {
  const light = tone === 'light';
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      style={({ pressed }) => [
        styles.base,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: light ? 'rgba(220,220,224,0.92)' : colors.surfaceRaised,
          borderColor: light ? 'transparent' : colors.border,
          opacity: pressed ? 0.75 : 1,
        },
        style,
      ]}
    >
      <Icon name={icon} size={size * 0.5} color={light ? '#111' : colors.text} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
});
