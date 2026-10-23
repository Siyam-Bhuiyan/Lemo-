# Lemo Driver

Driver-side app for the Lemo limo/car-rental platform. Expo SDK 57 · Expo Router · TypeScript.

```bash
npm install --legacy-peer-deps
npx expo start
```

## Structure

```
src/
  app/                  Routes only (thin screens that compose feature components)
    (tabs)/             Home, Journeys, Messages, Profile + floating tab bar
    trip/[id].tsx       Journey details
    chat/[id].tsx       Passenger / support conversation
    ai/                 Limo AI home + conversation
    notifications.tsx
    edit-profile.tsx
  components/
    ui/                 Design-system primitives (AppText, Button, Card, Badge, Avatar, ...)
    layout/             TabBar, ScreenHeader, BottomActionBar
  features/             One folder per domain: home, trips, messages, chat, ai, notifications, profile
  theme/                colors, typography, spacing tokens
  data/                 Mock data (replace with API layer)
  types/                Shared domain types
  context/              DriverStatusContext (online / offline)
```

## Conventions

- Screens in `src/app` stay small; UI lives in `src/features/<domain>/components`.
- Never hard-code colours or fonts — use `@/theme` tokens and `AppText`.
- Import via the `@/` alias.
- `data/*` is mock data only; swap for API hooks per feature.
- The journey map is an SVG placeholder (`TripMap`); replace with `react-native-maps` when needed.
