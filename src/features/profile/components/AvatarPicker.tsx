import { Pressable, StyleSheet, View } from 'react-native';
import { Avatar, Icon } from '@/components/ui';

export function AvatarPicker({ name, onPress }: { name: string; onPress?: () => void }) {
  return (
    <View style={styles.wrap}>
      <Avatar name={name} size={112} ring />
      <Pressable style={styles.camera} onPress={onPress}>
        <Icon name="camera-outline" size={20} color="#111" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignSelf: 'center', marginTop: 12 },
  camera: {
    position: 'absolute',
    right: 0,
    bottom: 2,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
