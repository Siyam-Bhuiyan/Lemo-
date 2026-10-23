import { IconName } from '@/components/ui';
import { JourneyStatus } from '@/types';

export interface JourneyActions {
  secondary: { label: string; next: JourneyStatus };
  primary: { label: string; icon: IconName; next: JourneyStatus };
}

/** Footer buttons per status — each primary action moves the journey one step forward. */
export const actionsByStatus: Partial<Record<JourneyStatus, JourneyActions>> = {
  requested: {
    secondary: { label: 'Decline', next: 'cancelled' },
    primary: { label: 'Accept Journey', icon: 'check', next: 'booked' },
  },
  booked: {
    secondary: { label: 'Cancel', next: 'cancelled' },
    primary: { label: 'Start Journey', icon: 'navigation-variant-outline', next: 'onWay' },
  },
  onWay: {
    secondary: { label: 'Cancel', next: 'cancelled' },
    primary: { label: "I've Arrived", icon: 'map-marker-check-outline', next: 'inProgress' },
  },
  inProgress: {
    secondary: { label: 'Report Issue', next: 'inProgress' },
    primary: { label: 'Complete Journey', icon: 'flag-checkered', next: 'completed' },
  },
};
