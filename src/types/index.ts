export type JourneyStatus = 'requested' | 'booked' | 'onWay' | 'inProgress' | 'completed' | 'cancelled';

export type JourneyType = 'fromAirport' | 'toAirport' | 'hourly' | 'roundTrip' | 'event';

export interface Passenger {
  id: string;
  name: string;
  rating: number;
  phone: string;
  avatarUri?: string;
}

export interface Place {
  name: string;
  address: string;
}

export interface FlightInfo {
  airline: string;
  code: string;
  from: string;
  to: string;
  status: 'Scheduled' | 'Landed' | 'Delayed';
  onTime: boolean;
  arrivingAt: string;
  pickupFrom: string;
}

export interface JourneyPreferences {
  passengers: number;
  carryOnBags: number;
  largeBags: number;
  childSeat: string | null;
  accessible: boolean;
  petFriendly: boolean;
}

export interface Journey {
  id: string;
  type: JourneyType;
  status: JourneyStatus;
  pickup: Place;
  dropoff: Place;
  month: string;
  day: string;
  time: string;
  passenger: Passenger;
  vehicle: { name: string; plate: string };
  preferences: JourneyPreferences;
  flight?: FlightInfo;
  notes?: string;
  baseFare: number;
  platformFeePercent: number;
  estMinutes: number;
  arrivesInSeconds?: number;
}

export interface ChatThread {
  id: string;
  title: string;
  journeyId?: string;
  lastMessage: string;
  time: string;
  unread: number;
  online?: boolean;
  support?: boolean;
  statusLabel?: string;
  arrivingInMin?: number;
}

export interface ChatMessage {
  id: string;
  text: string;
  time: string;
  mine: boolean;
}

export type NotificationKind =
  | 'request'
  | 'reminder'
  | 'passengerMessage'
  | 'passengerArrived'
  | 'completed'
  | 'payout'
  | 'rating'
  | 'cancelled';

export interface AppNotification {
  id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  highlight?: string;
  time: string;
  unread: boolean;
}
