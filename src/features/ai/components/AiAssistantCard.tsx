import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, View } from 'react-native';
import { AppText, Icon } from '@/components/ui';
import { colors, radius } from '@/theme';

interface Props {
  title?: string;
  body: string;
  cta: string;
}

/** Blue "AI Assistant" banner used on Home and Profile. */
export function AiAssistantCard({ title = 'AI Assistant', body, cta }: Props) {
  return (
    <LinearGradient
      colors={['#1b2740', '#171d2b']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <Icon name="star-four-points-outline" size={34} color={colors.gold} />
      <View style={styles.texts}>
        <AppText variant="heading" style={styles.title}>
          {title}
        </AppText>
        <AppText variant="caption" color="textMuted">
          {body}
        </AppText>
      </View>
      <Pressable style={styles.cta} onPress={() => router.push('/ai')}>
        <Icon name="help-circle-outline" size={16} color="#111" />
        <AppText variant="label" color="#111">
          {cta}
        </AppText>
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderRadius: radius.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: '#222c40',
  },
  texts: { flex: 1, gap: 2 },
  title: { fontSize: 19 },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
});
