import { useState } from 'react';
import { View } from 'react-native';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { Screen, SectionHeader } from '@/components/ui';
import { mockNotifications } from '@/data/notifications';
import { NotificationItem } from '@/features/notifications/components/NotificationItem';

export default function NotificationsScreen() {
  const [items, setItems] = useState(mockNotifications);
  const unread = items.filter((n) => n.unread);
  const earlier = items.filter((n) => !n.unread);

  const markAll = () => setItems((list) => list.map((n) => ({ ...n, unread: false })));

  return (
    <Screen bottomInset={40}>
      <ScreenHeader title="Notifications" />
      {unread.length > 0 ? (
        <View>
          <SectionHeader title="Unread" action={{ label: 'Mark all as read', onPress: markAll }} />
          {unread.map((n, i) => (
            <NotificationItem key={n.id} item={n} last={i === unread.length - 1} />
          ))}
        </View>
      ) : null}
      <SectionHeader title="Earlier" />
      {earlier.map((n, i) => (
        <NotificationItem key={n.id} item={n} last={i === earlier.length - 1} />
      ))}
    </Screen>
  );
}
