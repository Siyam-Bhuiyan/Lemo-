import { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { colors } from '@/theme';

interface Props {
  x: number;
  width: number;
}

/** Soft ice-blue highlight that slides behind the active tab. */
export function GlassBubble({ x, width }: Props) {
  const translateX = useRef(new Animated.Value(x)).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: x,
      useNativeDriver: true,
      damping: 18,
      stiffness: 200,
      mass: 0.8,
    }).start();
  }, [x, translateX]);

  return <Animated.View pointerEvents="none" style={[styles.bubble, { width, transform: [{ translateX }] }]} />;
}

const styles = StyleSheet.create({
  bubble: {
    position: 'absolute',
    top: 7,
    bottom: 7,
    left: 0,
    borderRadius: 20,
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: colors.accentBorder,
  },
});
