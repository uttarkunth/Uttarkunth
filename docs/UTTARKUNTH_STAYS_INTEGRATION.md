# Uttarkunth Stays — implementation and launch checklist

## Current platform contract

- Live Supabase project: `uttarkunth-stays`.
- Public listing source: `public.properties` with both `published = true` and `moderation_status = 'approved'`.
- Inventory source: `public.room_units`; blocked dates: `public.room_availability_blocks`.
- Guest requests are written to `public.booking_requests`.
- Confirmed reservations and the final date-conflict constraint live in `public.stay_bookings`.
- Host decisions must call the database RPC `respond_to_booking_request`; never PATCH a request into confirmed status directly from a browser.
- Commission snapshots are assigned by the booking decision workflow: 0% introductory commission for the first 12 months of the signed agreement, then 10% standard commission.
- Online payments are deliberately not enabled. Guest-facing copy should say “Request to book” and “Pay at property after host confirmation” until Razorpay is legally and technically configured.

## Netlify environment variables

Required server-side values:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY` (Netlify Functions only; never prefix with `VITE_` and never expose to the browser)

Optional public frontend values:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY` or `VITE_SUPABASE_PUBLISHABLE_KEY`

Never commit actual credentials. Public listing functions use explicit allow-listed columns. Server-only booking functions use the service key only after validating every input and return generic database errors.

## Guest booking lifecycle

1. Guest searches approved published properties and active rooms.
2. Guest chooses dates and party size; availability is advisory only.
3. Guest submits a booking request; server validates room capacity, dates, blocked dates, confirmed reservations, and duplicate pending requests.
4. The API returns a cryptographically random booking reference and a one-time 256-bit tracking token. The database stores only a SHA-256 hash of the token. Guest must keep both values private.
5. Host sees pending requests in `booking_requests`, and responds through `respond_to_booking_request`.
6. The RPC transaction checks authorization and date conflicts before inserting/updating `stay_bookings`; the exclusion constraint is the final protection against concurrent confirmations.
7. Guest can track the request using reference + token. Online cancellation is only available while the request is pending; confirmed-stay changes are handled by the host.

## Roles and pages

- Guest: public search, property detail, date/guest selection, request form, secure trip tracking.
- Host: sign-in required; only assigned properties and their pending requests; room inventory and blocked dates; decisions through RPC.
- Admin: sign-in and registry-backed platform-admin role required; moderation, host assignment, agreement management, and audit log.
- Unauthenticated visitors must never receive guest emails/phones, host contacts, private moderation notes, access-token hashes, or service credentials.

## Commission and payment

- Intro period: 12 months from the agreement start/acceptance date at 0%.
- Standard rate: 10% after the intro period.
- Store the effective commission and amount as a booking snapshot at confirmation, so later agreement edits do not rewrite historic booking economics.
- Payment method for this first release is pay-at-property; no fake payment success or test order should create a real reservation.

## Deployment blockers / acceptance tests

- Wire `StaysView`, `HostOnboardingView`, `GuestTripsView`, and `AdminDashboardView` to the live API/authenticated data rather than local mock state.
- Implement host/admin authentication and server-side authorization for every host/admin endpoint.
- Confirm RPC authorization is derived from the authenticated user and platform-admin registry; never trust a browser-supplied `p_actor_is_admin`.
- Add abuse protection for public request creation and guest tracking (rate limits, email verification or CAPTCHA, and monitoring).
- Verify booking reference/token tracking and cancellation, request → host confirmation, rejection, blocked dates, concurrent confirmation conflicts, moderation, agreement commission snapshots, and RLS.
- Run typecheck/build and browser-based guest/host/admin flows before production launch.
- Do not accept live bookings until all acceptance tests pass.
