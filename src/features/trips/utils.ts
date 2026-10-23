import { IconName } from '@/components/ui';
import { BadgeTone } from '@/components/ui';
import { Journey, JourneyStatus, JourneyType } from '@/types';

export const journeyTypeMeta: Record<JourneyType, { label: string; icon: IconName }> = {
  fromAirport: { label: 'From Airport', icon: 'airplane-landing' },
  toAirport: { label: 'To Airport', icon: 'airplane-takeoff' },
  hourly: { label: 'Hourly Ride', icon: 'clock-outline' },
  roundTrip: { label: 'Round Trip', icon: 'swap-horizontal' },
  event: { label: 'Event Booking', icon: 'calendar-star' },
};

export const statusMeta: Record<JourneyStatus, { label: string; tone: BadgeTone }> = {
  requested: { label: 'REQUEST', tone: 'gold' },
  booked: { label: 'BOOKED', tone: 'orange' },
  onWay: { label: 'ON WAY', tone: 'purple' },
  inProgress: { label: 'IN PROGRESS', tone: 'blue' },
  completed: { label: 'COMPLETED', tone: 'green' },
  cancelled: { label: 'CANCELLED', tone: 'red' },
};

export const formatMoney = (value: number) =>
  `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const feeAmount = (j: Journey) => (j.baseFare * j.platformFeePercent) / 100;
export const payout = (j: Journey) => j.baseFare - feeAmount(j);

export const isAirportPickup = (j: Journey) => j.type === 'fromAirport';
export const isAirportDropoff = (j: Journey) => j.type === 'toAirport';
