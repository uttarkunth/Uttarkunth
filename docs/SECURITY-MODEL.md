# Uttarkunth Stays — security model

This document defines mandatory access boundaries for guests, hosts, and Uttarkunth platform administrators. Security controls apply to the server and database; hiding a button in the user interface is not authorization.

## Security principals

- **Guest / anonymous visitor:** may browse approved public listings and submit a booking request through the public server API. A guest may track or cancel an eligible pending request only with both the booking reference and the high-entropy one-time token.
- **Host:** must have a verified Supabase Auth session and may manage only their explicitly assigned properties and requests. Host decisions are made through a server endpoint that derives the actor from the validated access token and calls the transactional booking RPC.
- **Uttarkunth administrator:** must be authorized using the trusted platform-admin registry / trusted server-side role. Admin operations require server-side checks and should be recorded in the audit log. A browser-supplied role, email, or actor ID is never sufficient.
- **Server functions:** may use the Supabase service-role key only in server-side environment variables. They must validate inputs, authorize the principal, select only necessary columns, return generic errors, and never return the key or database internals.

## Required controls

### Guest privacy
- Do not expose guest email, telephone number, private notes, access-token hashes, host contacts, moderation notes, agreements, admin records, or raw database rows in public responses.
- Booking references use cryptographically secure randomness and are not sufficient by themselves to retrieve a booking.
- The guest tracking token is shown once; only its SHA-256 hash is stored in the database.
- Use exact reference + token-hash matching. Do not use email as a secret or rely on wildcard string matching.
- Online cancellation only changes an eligible pending request. Confirmed stay changes require an authorized host/support workflow.

### Host isolation
- Validate bearer tokens via Supabase Auth on the server.
- Derive the actor ID from the verified Auth response; never trust actor IDs or admin flags from request JSON.
- Validate property assignment server-side and again in the database RPC.
- Every host response and inventory mutation must be scoped to the host's assigned property IDs.
- Host confirmation must be transactional, re-check blocked dates and current bookings, and use the database overlap constraint as the final concurrency guard.

### Uttarkunth platform protection
- Public listing responses use an explicit allow-list and require both `published = true` and `moderation_status = 'approved'`.
- The public API uses the service-role key only on the server because the direct table RLS policy deliberately blocks anonymous reads. Never put that key in a `VITE_*` variable or browser bundle.
- Private service-only tables keep RLS enabled with no client policies and no `anon` / `authenticated` table grants. Server functions use a separately stored service key.
- Platform-admin authorization must use trusted registry or server-managed app metadata; never use user-editable metadata.
- Rate limiting uses an HMAC of a trusted proxy IP and an atomic database function. The limiter endpoint accepts only server-side calls.
- Return generic errors to clients; detailed database failures should be kept out of public responses.
- Keep CORS restricted to intended origins if cross-origin access is introduced. Same-site Netlify function calls need no wildcard CORS.

## Atomic request rate limiting

`public.try_consume_booking_rate_limit(text, integer, integer)` serializes requests for the same hashed IP with a transaction-scoped advisory lock, counts recent attempts, and inserts a rate-limit event atomically. Only `service_role` may execute it. The raw IP is not stored.

The cleanup in this function removes expired entries for the connecting IP. A scheduled cleanup for old hashes from inactive IPs should be added if request volume warrants it.

## Data protection and operations
- Secrets belong in the local untracked `.env` or Netlify server-side environment variables, never source code, client variables, build logs, screenshots, or commits.
- Separate development/test credentials from production and use test properties for validation.
- Do not enable Razorpay live payments until payment verification, webhook signature validation, reconciliation, refunds, and legal/business setup have been completed.
- Review auth settings, verified email policy, MFA for administrators, logging/alerts, backups, and retention before public launch.

## Current limitations — not a launch certification
The public guest browse/request/tracking path has code-level controls, and a server-only authenticated host booking endpoint is present. The complete host and admin interfaces, formal account recovery, end-to-end cross-role tests, concurrency tests, monitoring, and production acceptance testing still need to be finished. This checklist is not a claim that the complete marketplace is security-certified.
