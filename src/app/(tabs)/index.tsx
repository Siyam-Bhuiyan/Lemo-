import { View } from 'react-native';
import { Screen, SectionHeader } from '@/components/ui';
import { TAB_BAR_HEIGHT } from '@/theme';
import { mockDriver } from '@/data/driver';
import { mockJourneys } from '@/data/journeys';
import { mockNotifications } from '@/data/notifications';
import { AiAssistantCard } from '@/features/ai/components/AiAssistantCard';
import { FeatureCards } from '@/features/home/components/FeatureCards';
import { FrequentAreas } from '@/features/home/components/FrequentAreas';
import { HomeHeader } from '@/features/home/components/HomeHeader';
import { PromoCarousel } from '@/features/home/components/PromoCarousel';
import { QuickActions } from '@/features/home/components/QuickActions';
import { StatusCard } from '@/features/home/components/StatusCard';
import { JourneyCard } from '@/features/trips/components/JourneyCard';

const upcoming = mockJourneys.filter((j) => j.status === 'onWay' || j.status === 'booked');
const unread = mockNotifications.filter((n) => n.unread).length;

export default function HomeScreen() {
  return (
    <Screen bottomInset={TAB_BAR_HEIGHT + 50}>
      <HomeHeader name={mockDriver.firstName} unread={unread} />
      <StatusCard />
      <QuickActions />
      <PromoCarousel />

      <SectionHeader title="Upcoming Journeys" trailing={`${upcoming.length} Total`} />
      {upcoming.map((j) => (
        <JourneyCard key={j.id} journey={j} />
      ))}

      <View style={{ marginTop: 6 }}>
        <AiAssistantCard body="Get help with journeys, payouts, and account questions." cta="Ask AI" />
      </View>
      <FeatureCards />
      <FrequentAreas />
    </Screen>
  );
}
