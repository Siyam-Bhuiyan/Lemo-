import { router } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { AppText, SectionHeader } from '@/components/ui';
import { aiRecentChats, aiSuggestions } from '@/data/ai';
import { AiAvatar } from '@/features/ai/components/AiAvatar';
import { RecentChatRow } from '@/features/ai/components/RecentChatRow';
import { SuggestionCard } from '@/features/ai/components/SuggestionCard';
import { ChatBackground } from '@/features/chat/components/ChatBackground';
import { ChatHeader } from '@/features/chat/components/ChatHeader';
import { ChatInput } from '@/features/chat/components/ChatInput';
import { KeyboardAvoidingView, Platform } from 'react-native';

export default function AiHomeScreen() {
  const openChat = () => router.push('/ai/chat');

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ChatBackground>
        <ChatHeader title="Limo AI" avatar={<AiAvatar size={46} />} />
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.hero}>
            <AiAvatar size={104} />
            <AppText variant="title" style={styles.heroTitle}>
              Limo AI
            </AppText>
            <AppText variant="body" color="textMuted">
              Your friendly AI buddy for Limoground!
            </AppText>
          </View>

          <SectionHeader title="Suggested for you" />
          {aiSuggestions.map((s) => (
            <SuggestionCard key={s.id} icon={s.icon} title={s.title} subtitle={s.subtitle} onPress={openChat} />
          ))}

          <SectionHeader title="Recent chats" action={{ label: 'View All', onPress: () => {} }} />
          {aiRecentChats.map((r) => (
            <RecentChatRow key={r.id} title={r.title} time={r.time} onPress={openChat} />
          ))}
        </ScrollView>
        <ChatInput placeholder="Ask Limo AI anything" onSend={openChat} />
      </ChatBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#000' },
  content: { padding: 16, paddingBottom: 24 },
  hero: { alignItems: 'center', marginTop: 56, marginBottom: 6, gap: 6 },
  heroTitle: { fontFamily: 'Figtree_700Bold', fontSize: 26, marginTop: 10 },
});
