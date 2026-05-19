# QuickHire

> Local services marketplace — clients post bookings, providers get pushed. Built as a React Native portfolio piece to demonstrate five technical pillars with deliberate architectural calls.

**Status:** Portfolio piece, not a live product. Ships against a defined set of goals, then stops.

<!-- TODO: 3 screenshots side-by-side (feed, booking detail, profile) or one GIF -->

![React Native](https://img.shields.io/badge/React_Native-0.83-61DAFB?logo=react&logoColor=white)
![Expo](https://img.shields.io/badge/Expo-SDK_55-000020?logo=expo&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-pg__graphql-3FCF8E?logo=supabase&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-v5-FF4154?logo=reactquery&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)

## Why this exists

I've shipped Flutter for six years. This repo is what happened when I applied the same architectural discipline to a different stack — not a learning exercise, a deliberate cross-pollination. The five pillars below were chosen because they're the load-bearing decisions a senior mobile engineer makes in real production work; everything else is intentionally minimal.

## Demo

<!-- TODO: Loom embed or thumbnail link (2–3 min walkthrough) -->

## Architecture: the five pillars

### 1. pg_graphql over hand-rolled REST

Supabase's GraphQL is auto-generated from the Postgres schema via the `pg_graphql` extension — every table, every column, every relation, free. Picked this over hand-rolling REST endpoints because the schema *is* the API contract: when I add a column, every consumer sees it without a hand-edited DTO. Tradeoff: GraphQL is overkill for a 6-table app, but the alternative (six hand-written REST endpoints with their own validation) is also overkill *and* duplicative.

### 2. TanStack Query as single source of truth

User state (`['user', 'me']`) lives in the query cache, full stop. No Zustand store, no Context provider, no `useState` in a parent — the cache *is* the source. The service layer reads from it synchronously via `queryClient.getQueryData`; hooks observe it via `useQuery`. Tradeoff: ties the architecture to TanStack Query, but the alternative was running two competing sources of truth and reconciling them, which is the exact bug class that justifies a single-source rule in the first place.

### 3. React Hook Form with `FormProvider`

Profile editors (provider service editor, client profile editor) span multiple screens but share validation rules, dirty state, and submit handlers. `FormProvider` lets nested `<Controller>` components read the same form state without prop drilling. Tradeoff: more upfront setup than `useState`, but pays for itself the moment forms span more than one screen.

### 4. FlashList for performance-critical lists

Services feed and bookings list use `@shopify/flash-list` v2 — auto-measuring, virtualized, drop-in replacement for `FlatList` with significantly better scroll performance on long lists. Worth noting: FlashList v2 *removed* the `estimatedItemSize` prop because the library now measures items automatically. Tutorials and reviewers still in v1 muscle memory recommend adding it; I checked the migration notes.

### 5. Push notifications end-to-end

`expo-notifications` registers device tokens on login + boot + OS rotation, stores them in a `device_tokens` table with RLS, and a Supabase Edge Function listens on `bookings INSERT` to POST through the Expo Push API to FCM. The Edge Function has a self-healing janitor: when Expo returns `DeviceNotRegistered`, the row is deleted in the same request — no cron, no scheduled cleanup, the failure response *is* the cleanup signal.

**iOS skip rationale:** I don't have a paid Apple Developer Program ($99/yr), so iOS devices can't get the APNs entitlement. The code paths are wired for both platforms; `getExpoPushTokenAsync()` returns `null` gracefully on iOS, the hook skips registration, and the rest of the app is unaffected. Production-realistic: this is what shipping on a freelance budget looks like.

## What AI helped with vs what required judgment

AI assistance (Claude, Copilot) covered: boilerplate scaffolding, TypeScript types, Supabase client setup, syntax recall, `expo-notifications` API ergonomics, RLS policy phrasing. The kind of work that's well-trodden and where the AI is faster than a docs lookup.

Where AI suggestions got overridden:

- **Assertion vs inspection error contracts.** A code review (AI-assisted) flagged `userService.currentUser()` (throws) and `fetchProfile()` (returns `null`) as "inconsistent error contracts." Defended the design: they have *different jobs*. `currentUser` is an assertion for service-layer callers that only run in authenticated paths; `fetchProfile` is a probe at the auth boundary where "no session" is a normal state, not an error. Different return types are *correct*, not inconsistent — the names already convey it (`current` = imperative assertion, `fetch` = probe). Unifying would have added ~6 defensive null chains for a state the auth gate already prevents.

- **iOS push skip strategy.** Three options were on the table: skip iOS code branches entirely / fake it with local notifications / wire both platforms with graceful skip. Chose option 3 because it ships the same shared code that maps onto production reality the moment the paid Apple cert lands. A judgment call about future maintainability, not a code-level choice.

- **Stop at done, not at perfect.** Most junior portfolio repos accrete features indefinitely. This one ships against a defined goal — five pillars, demonstrably working — and stops. See the deliberately-skipped scope below.

## Quick start

```bash
git clone git@github.com:zeeshanahmad0201/quickhire.git
cd quickhire
npm install
```

Create `.env` at project root:

```
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

The app uses native modules (`expo-notifications`, `expo-location`), so Expo Go won't run it. Build a dev client:

```bash
npx expo run:ios       # or :android
```

**For push notifications on Android**, you'll additionally need:

- A Firebase project with FCM enabled
- `google-services.json` placed at repo root (gitignored)
- FCM v1 service account JSON uploaded to your Expo project via `eas credentials`
- A Database Webhook in Supabase pointed at the deployed `send-booking-notification` Edge Function

## What's intentionally not done

The scope was deliberate. Skipped on purpose:

- **Multi-service per provider** — one active service per provider, profile *is* the listing. Simpler model, faster to demo. The DB allows it; the UI doesn't expose it.
- **In-app messaging** — schema exists (`conversations`, `messages` tables); UI does not. Push notifications was the higher-leverage pillar for the same week of effort.
- **Search and filters** — services feed shows all active services without query parameters. Search would be a separate feature, not a deepening of any pillar.
- **Booking lifecycle UI** — bookings have status (`pending → confirmed → completed → cancelled`) in the schema; the UI shows current status but doesn't offer state transitions. The notification flow demonstrates the create event, which was the demo target.
- **iOS push delivery** — wired but skipped at runtime (see the iOS skip rationale above).
- **Coverage** — three smoke tests prove the testing setup works; not coverage, just signal. Real coverage was not the goal of this week.

Each of these would be a real feature, not polish. Their absence is the scope, not a gap.

---

Built by [Zeeshan Ahmad](https://github.com/zeeshanahmad0201). Six years of Flutter, cross-pollinating to React Native.
