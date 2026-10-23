import { LinearGradient } from 'expo-linear-gradient';
import { Image, StyleSheet, View } from 'react-native';
import { colors } from '@/theme';
import { AppText } from './AppText';

interface Props {
  name: string;
  uri?: string;
  size?: number;
  online?: boolean;
  ring?: boolean;
}

const initials = (name: string) =>
  name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

export function Avatar({ name, uri, size = 44, online, ring }: Props) {
  const dot = Math.max(10, size * 0.22);
  return (
    <View style={{ width: size, height: size }}>
      <View
        style={[
          styles.circle,
          { width: size, height: size, borderRadius: size / 2 },
          ring && { borderWidth: 2, borderColor: colors.border },
        ]}
      >
        {uri ? (
          <Image source={{ uri }} style={StyleSheet.absoluteFill} />
        ) : (
          <LinearGradient
            colors={['#3a3a42', '#1c1c22']}
            style={[StyleSheet.absoluteFill, styles.center]}
          >
            <AppText variant="subheading" style={{ fontSize: size * 0.36 }}>
              {initials(name)}
            </AppText>
          </LinearGradient>
        )}
      </View>
      {online ? (
        <View
          style={[
            styles.dot,
            { width: dot, height: dot, borderRadius: dot / 2, right: 0, bottom: size * 0.04 },
          ]}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  circle: { overflow: 'hidden', backgroundColor: colors.surfaceRaised },
  center: { alignItems: 'center', justifyContent: 'center' },
  dot: { position: 'absolute', backgroundColor: colors.green, borderWidth: 2, borderColor: '#000' },
});
