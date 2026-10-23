import { Text, TextProps, TextStyle } from 'react-native';
import { colors, ColorName, textVariants, TextVariant } from '@/theme';

interface Props extends TextProps {
  variant?: TextVariant;
  color?: ColorName | (string & {});
  weight?: TextStyle['fontFamily'];
}

export function AppText({ variant = 'body', color = 'text', weight, style, ...rest }: Props) {
  const resolved = color in colors ? colors[color as ColorName] : color;
  return (
    <Text
      {...rest}
      style={[textVariants[variant], { color: resolved }, weight ? { fontFamily: weight } : null, style]}
    />
  );
}
