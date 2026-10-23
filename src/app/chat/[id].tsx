import { useLocalSearchParams } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Avatar } from '@/components/ui';
import { findJourney } from '@/data/journeys';
import { mockChat, mockThreads } from '@/data/messages';
import { ChatBackground } from '@/features/chat/components/ChatBackground';
import { ChatHeader } from '@/features/chat/components/ChatHeader';
import { ChatInput } from '@/features/chat/components/ChatInput';
import { JourneyBanner } from '@/features/chat/components/JourneyBanner';
import { MessageBubble } from '@/features/chat/components/MessageBubble';
import { ChatMessage } from '@/types';

const nowLabel = () =>
  new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const thread = mockThreads.find((t) => t.id === id) ?? mockThreads[0];
  const journey = findJourney(thread.journeyId);
  const [messages, setMessages] = useState<ChatMessage[]>(mockChat);
  const list = useRef<FlatList<ChatMessage>>(null);

  const send = useCallback((text: string) => {
    setMessages((m) => [...m, { id: String(Date.now()), text, time: nowLabel(), mine: true }]);
  }, []);

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ChatBackground>
        <ChatHeader
          title={thread.title}
          subtitle={thread.journeyId ? `#${thread.journeyId}` : undefined}
          avatar={<Avatar name={thread.title} size={46} />}
        />
        <FlatList
          ref={list}
          data={messages}
          keyExtractor={(m) => m.id}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => list.current?.scrollToEnd({ animated: true })}
          ListHeaderComponent={
            journey ? <JourneyBanner journey={journey} minutes={thread.arrivingInMin ?? 21} /> : <View />
          }
          renderItem={({ item }) => <MessageBubble message={item} peerName={thread.title} />}
        />
        <ChatInput onSend={send} />
      </ChatBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#000' },
  content: { padding: 16, paddingTop: 16 },
});
