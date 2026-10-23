import { useState } from 'react';
import { View } from 'react-native';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { Screen, SectionHeader } from '@/components/ui';
import { mockNotifications } from '@/data/notifications';
import { NotificationItem } from '@/features/notifications/components/NotificationItem';
import { NotificationModal } from '@/features/notifications/components/NotificationModal';
import { AppNotification } from '@/types';

export default function NotificationsScreen() {
  const [items, setItems] = useState(mockNotifications);
  const [selected, setSelected] = useState<AppNotification | null>(null);
  const unread = items.filter((n) => n.unread);
  const earlier = items.filter((n) => !n.unread);

  const markAll = () => setItems((list) => list.map((n) => ({ ...n, unread: false })));

  const open = (item: AppNotification) => {
    setSelected(item);
    setItems((list) => list.map((n) => (n.id === item.id ? { ...n, unread: false } : n)));
  };

  return (
    <Screen bottomInset={40}>
      <ScreenHeader title="Notifications" />
      {unread.length > 0 ? (
        <View>
          <SectionHeader title="Unread" action={{ label: 'Mark all as read', onPress: markAll }} />
          {unread.map((n, i) => (
            <NotificationItem key={n.id} item={n} last={i === unread.length - 1} onPress={open} />
          ))}
        </View>
      ) : null}
      <SectionHeader title="Earlier" />
      {earlier.map((n, i) => (
        <NotificationItem key={n.id} item={n} last={i === earlier.length - 1} onPress={open} />
      ))}
      <NotificationModal notification={selected} onClose={() => setSelected(null)} />
    </Screen>
  );
}
