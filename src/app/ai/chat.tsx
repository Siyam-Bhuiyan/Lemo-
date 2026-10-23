import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { AppText } from '@/components/ui';
import { findJourney } from '@/data/journeys';
import { AiAvatar } from '@/features/ai/components/AiAvatar';
import { AiJourneyMiniCard, AiTimeChangeCard } from '@/features/ai/components/AiJourneyMiniCard';
import { AiReply, ConfirmActions } from '@/features/ai/components/AiReply';
import { ChatBackground } from '@/features/chat/components/ChatBackground';
import { ChatHeader } from '@/features/chat/components/ChatHeader';
import { ChatInput } from '@/features/chat/components/ChatInput';
import { MessageBubble } from '@/features/chat/components/MessageBubble';

const journey = findJourney('LGA202154')!;

/** Demo flow: driver reports a delay, Limo AI asks for confirmation, then confirms the update. */
export default function AiChatScreen() {
  const [confirmed, setConfirmed] = useState(false);
  const [extra, setExtra] = useState<{ id: string; text: string }[]>([]);

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ChatBackground>
        <ChatHeader title="Limo AI" avatar={<AiAvatar size={46} />} />
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.mine}>
            <AiJourneyMiniCard journey={journey} />
          </View>
          <MessageBubble
            peerName="You"
            message={{
              id: 'u1',
              mine: true,
              time: '12:39 PM',
              text: 'My Journey ID is #LGA202154. I want to push the pickup time from 8:30 AM to 9:00 AM.',
            }}
          />

          <AiReply
            time="12:21 PM"
            footer={null}
          >
            <AppText variant="body" style={styles.reply}>
              I found Journey <AppText color="gold">#LGA202154</AppText>.{'\n\n'}
              The current pickup time is <AppText variant="bodyStrong">8:30 AM</AppText>. You&apos;re requesting to
              change it to <AppText variant="bodyStrong">9:00 AM</AppText>.{'\n\n'}
              The passenger will be notified and may need to approve. Shall I submit the update?
            </AppText>
            <ConfirmActions confirmed={confirmed} onConfirm={() => setConfirmed(true)} />
          </AiReply>

          {confirmed ? (
            <AiReply
              time="12:21 PM"
              footer={<AiTimeChangeCard journey={journey} from="8:30 AM" to="9:00 AM" />}
            >
              <AppText variant="body" style={styles.reply}>
                The pickup time has been updated successfully.{'\n\n'}
                Previous time: 8:30 AM{'\n'}
                New time: 9:00 AM
              </AppText>
            </AiReply>
          ) : null}

          {extra.map((m) => (
            <MessageBubble
              key={m.id}
              peerName="You"
              message={{ id: m.id, mine: true, time: 'Now', text: m.text }}
            />
          ))}
        </ScrollView>
        <ChatInput
          placeholder="Ask Limo AI anything"
          onSend={(text) => setExtra((e) => [...e, { id: String(Date.now()), text }])}
        />
      </ChatBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#000' },
  content: { padding: 16, paddingTop: 20 },
  mine: { alignSelf: 'flex-end', width: '88%', marginBottom: 12 },
  reply: { fontSize: 16, lineHeight: 23 },
});
