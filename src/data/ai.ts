import { IconName } from '@/components/ui';

export const aiSuggestions: { id: string; icon: IconName; title: string; subtitle: string }[] = [
  { id: 'a1', icon: 'map-marker-path', title: 'How do I accept a journey?', subtitle: 'Learn how requests work' },
  { id: 'a2', icon: 'cash-check', title: 'How are my payouts calculated?', subtitle: 'Understand fares and fees' },
  { id: 'a3', icon: 'account-alert-outline', title: 'What if my passenger no-shows?', subtitle: 'Wait times and compensation' },
];

export const aiRecentChats = [
  { id: 'r1', title: 'I need help with my upcoming airport pickup', time: '8:30AM' },
  { id: 'r2', title: 'How do I update my payout method?', time: 'Yesterday' },
  { id: 'r3', title: 'What vehicles qualify for hourly boo...', time: '2 days ago' },
];
