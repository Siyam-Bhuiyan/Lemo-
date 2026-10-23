import { Pressable, StyleSheet, View } from 'react-native';
import { AppText, Icon, Screen } from '@/components/ui';
import { mockDriver } from '@/data/driver';
import { AiAssistantCard } from '@/features/ai/components/AiAssistantCard';
import { MenuSection } from '@/features/profile/components/MenuSection';
import { ProfileBanner } from '@/features/profile/components/ProfileBanner';
import {
  accountSection,
  legalSection,
  preferencesSection,
  supportSection,
} from '@/features/profile/menu';
import { colors, radius, TAB_BAR_HEIGHT } from '@/theme';

export default function ProfileScreen() {
  return (
    <Screen bottomInset={TAB_BAR_HEIGHT + 50}>
      <ProfileBanner name={`${mockDriver.firstName} ${mockDriver.lastName}`} email={mockDriver.email} />
      <MenuSection section={accountSection} />
      <MenuSection section={preferencesSection} />
      <MenuSection section={supportSection} />
      <View style={styles.ai}>
        <AiAssistantCard body="Your AI assistant is here to help with journeys, payouts, and support!" cta="Ask" />
      </View>
      <MenuSection section={legalSection} />
      <Pressable style={({ pressed }) => [styles.signOut, pressed && { opacity: 0.75 }]}>
        <AppText variant="subheading" color={colors.redText} style={styles.signOutText}>
          Sign Out
        </AppText>
        <Icon name="logout" size={24} color={colors.redText} />
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  ai: { marginTop: 22 },
  signOut: {
    marginTop: 20,
    height: 56,
    borderRadius: radius.md,
    backgroundColor: colors.redSoft,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
  },
  signOutText: { fontSize: 18, fontFamily: 'Figtree_500Medium' },
});
