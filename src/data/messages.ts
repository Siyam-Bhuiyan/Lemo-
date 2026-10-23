import { ChatMessage, ChatThread } from '@/types';

export const mockThreads: ChatThread[] = [
  {
    id: 'LGA202154',
    title: 'Noah Davis',
    journeyId: 'LGA202154',
    lastMessage: 'Perfect. Please call me when you arrive.',
    time: '12:21 PM',
    unread: 2,
    online: true,
    arrivingInMin: 10,
  },
  {
    id: 'LGA202155',
    title: 'Emma Wilson',
    journeyId: 'LGA202155',
    lastMessage: 'Thanks! See you at the terminal.',
    time: '12:21 PM',
    unread: 0,
    online: true,
    statusLabel: 'Booked',
  },
  {
    id: 'ST123456',
    title: 'LimoGround',
    journeyId: 'ST123456',
    lastMessage: "Got your request! We'll get back to you shortly.",
    time: '12:21 PM',
    unread: 2,
    support: true,
  },
];

export const mockChat: ChatMessage[] = [
  { id: '1', text: "I'm on the way to your pickup location.", time: '12:21 PM', mine: true },
  { id: '2', text: "Thanks. I'll be waiting near the main entrance.", time: '12:25 PM', mine: false },
  { id: '3', text: 'I should arrive in about 10 minutes.', time: '12:31 PM', mine: true },
  { id: '4', text: 'Perfect. Please call me when you arrive.', time: '12:32 PM', mine: false },
  {
    id: '5',
    text: "Traffic is moving a little slower than expected near the airport entrance, but I'm still on the way and should arrive in approximately 10 minutes. I'll call you as soon as I reach the pickup area so you can easily locate the black SUV with plate number BGY-3456.",
    time: '12:38 PM',
    mine: true,
  },
  { id: '6', text: "I can see you. I'm coming now.", time: '12:39 PM', mine: false },
];
