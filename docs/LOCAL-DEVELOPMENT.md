# Uttarkunth Stays — local development

This project snapshot contains the existing Uttarkunth website and the in-progress guest booking integration. It is not yet a production-ready release.

## Requirements
- Node.js 22 LTS and npm
- An internet connection for dependency installation and Supabase requests
- A development/test Supabase configuration

## Start on Windows CMD
1. Extract the ZIP and open CMD in the extracted project folder.
2. Run `npm install`.
3. Copy the sample variables: `copy .env.example .env`.
4. Edit `.env` with Notepad and set the server-side values:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. Run `npx netlify-cli dev` and open the localhost URL printed in the terminal, normally `http://localhost:8888`.

The service-role key is privileged. Keep it only in the local untracked `.env` file or Netlify's server-side environment settings. Never add it to a `VITE_*` variable, source code, Git, or public browser bundles. The public listing API uses it on the server solely to return an explicit allow-list of approved listing fields.

Razorpay and Google Maps are not required to preview the guest request flow; online payment is not enabled in this release.

## Expected preview
- Existing Uttarkunth site and Stays navigation
- Approved/published property cards when the backend is configured and listings exist
- Dates, guest count, room options, and request-to-book form
- Booking reference and one-time private tracking token
- Guest tracking using reference + token

Host sign-in/user management and administrator workflows are not complete. Use test properties and test guests only. Do not accept live bookings until the role-specific workflows and end-to-end tests pass.

## Troubleshooting
- If listing search fails, verify `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`, then restart Netlify Dev.
- If booking submission is rate limited during local tests, the limiter is shared for requests coming from the same network/IP. Use a dedicated test window and do not delete production data to reset it.
- If `npm install` fails, verify `node --version` and use Node.js 22 LTS.
