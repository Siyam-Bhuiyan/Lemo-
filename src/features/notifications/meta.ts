import { IconName } from '@/components/ui';
import { AppNotification, NotificationKind } from '@/types';

export const kindMeta: Record<NotificationKind, { icon: IconName; bg: string; category: string }> = {
  request: { icon: 'car-arrow-right', bg: '#f59e0b', category: 'Journey Request' },
  reminder: { icon: 'car-clock', bg: '#f59e0b', category: 'Reminder' },
  passengerMessage: { icon: 'message-processing-outline', bg: '#eab308', category: 'Message' },
  passengerArrived: { icon: 'flag-outline', bg: '#06b6d4', category: 'Pickup' },
  completed: { icon: 'map-marker-check-outline', bg: '#16a34a', category: 'Completed' },
  payout: { icon: 'credit-card-check-outline', bg: '#16a34a', category: 'Payout' },
  rating: { icon: 'star-outline', bg: '#8b5cf6', category: 'Rating' },
  cancelled: { icon: 'close-circle-outline', bg: '#ef4444', category: 'Cancelled' },
};

export interface NotificationAction {
  label: string;
  icon: IconName;
  route: 'trip' | 'chat';
}

/** Journey id referenced by the notification, e.g. "#LGA202154" -> "LGA202154". */
export const journeyIdOf = (n: AppNotification) => n.highlight?.replace('#', '');

/** The follow-up action offered in the detail modal, if the notification has one. */
export function actionFor(n: AppNotification): NotificationAction | null {
  if (!journeyIdOf(n)) return null;
  switch (n.kind) {
    case 'request':
      return { label: 'Review Journey', icon: 'car-search-outline', route: 'trip' };
    case 'passengerMessage':
      return { label: 'Open Chat', icon: 'message-text-outline', route: 'chat' };
    default:
      return { label: 'View Journey', icon: 'car-side', route: 'trip' };
  }
}
