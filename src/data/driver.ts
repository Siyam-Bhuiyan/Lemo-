export const mockDriver = {
  firstName: 'Siyam',
  lastName: 'Bhuiyan',
  email: 'siyambhuiyan@iut-dhaka.edu',
  phone: '789 123 123',
  licenseNumber: '',
  address: '2100 NW 42nd Ave, Miami, FL 33142',
  rating: 4.9,
  vehicle: 'SUV - Black',
  plate: 'ABC-123456',
};

export const mockStats = {
  todayEarnings: 348.49,
  weekEarnings: 1248.6,
  tripsThisWeek: 18,
  bonusTarget: 30,
};

export const savedAreas = [
  { id: 'a1', icon: 'home-outline', title: 'Home Base', address: '2350 SW 25th Ter, Miami, FL 33133' },
  { id: 'a2', icon: 'airplane', title: 'MIA Cell Phone Lot', address: '2100 NW 42nd Ave, Miami, FL 33142' },
  { id: 'a3', icon: 'gas-station-outline', title: 'Preferred Fuel Stop', address: '2770 SW 27th Ave, Miami, FL 33133' },
  { id: 'a4', icon: 'map-marker-outline', title: 'Ocean Drive Hotspot', address: '1234 Ocean Drive, Miami, FL' },
] as const;
