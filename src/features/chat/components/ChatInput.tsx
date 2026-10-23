import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/ui';
import { colors, fonts } from '@/theme';

interface Props {
  placeholder?: string;
  onSend: (text: string) => void;
}

export function ChatInput({ placeholder = 'Type a message', onSend }: Props) {
  const insets = useSafeAreaInsets();
  const [text, setText] = useState('');

  const send = () => {
    const value = text.trim();
    if (!value) return;
    onSend(value);
    setText('');
  };

  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 10) }]}>
      <Pressable hitSlop={10}>
        <Icon name="paperclip" size={28} />
      </Pressable>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder={placeholder}
        placeholderTextColor={colors.textFaint}
        selectionColor={colors.gold}
        style={styles.input}
        onSubmitEditing={send}
        returnKeyType="send"
      />
      <Pressable onPress={send} hitSlop={10} style={{ opacity: text.trim() ? 1 : 0.6 }}>
        <Icon name="send-outline" size={28} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingTop: 12,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(14,14,16,0.97)',
  },
  input: {
    flex: 1,
    height: 52,
    borderRadius: 26,
    paddingHorizontal: 22,
    color: colors.text,
    fontFamily: fonts.regular,
    fontSize: 16,
    backgroundColor: 'rgba(40,40,44,0.7)',
    borderWidth: 1,
    borderColor: colors.border,
  },
});
