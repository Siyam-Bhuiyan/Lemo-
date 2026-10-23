import { Pressable, StyleSheet, View } from 'react-native';
import { AppText, Icon, IconName } from '@/components/ui';
import { colors, radius } from '@/theme';

interface Props {
  icon: IconName;
  title: string;
  subtitle: string;
  onPress?: () => void;
}

export function SuggestionCard({ icon, title, subtitle, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && { opacity: 0.75 }]}>
      <Icon name={icon} size={32} color={colors.textMuted} />
      <View style={styles.texts}>
        <AppText variant="subheading" style={styles.title}>
          {title}
        </AppText>
        <AppText variant="body" color="textMuted" style={{ fontSize: 14 }}>
          {subtitle}
        </AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
    marginBottom: 12,
    borderRadius: radius.md,
    backgroundColor: 'rgba(60,60,64,0.38)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  texts: { flex: 1, gap: 2 },
  title: { fontFamily: 'Figtree_500Medium', fontSize: 17 },
});
