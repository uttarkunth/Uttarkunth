import test from 'node:test';
import { handler as publicPropertiesHandler } from '../netlify/functions/stays-properties.js';
import { handler as guestBookingsHandler } from '../netlify/functions/stays-bookings.js';
import { handler as hostBookingsHandler } from '../netlify/functions/stays-host-bookings.js';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const publicApi = read('netlify/functions/stays-properties.js');
const guestApi = read('netlify/functions/stays-bookings.js');
const hostApi = read('netlify/functions/stays-host-bookings.js');

function sourceFiles(directory) {
  return fs.readdirSync(path.join(root, directory), { withFileTypes: true }).flatMap((entry) => {
    const relative = path.join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(relative);
    return [relative];
  });
}

test('public property endpoint uses server-only key and approved/published filters', () => {
  assert.match(publicApi, /SUPABASE_SERVICE_ROLE_KEY/);
  assert.doesNotMatch(publicApi, /SUPABASE_ANON_KEY|SUPABASE_PUBLISHABLE_KEY/);
  assert.match(publicApi, /published=eq\.true/);
  assert.match(publicApi, /moderation_status=eq\.approved/);
  assert.match(publicApi, /select=id,slug,name,description,address,village,district,state,latitude,longitude,amenities,photos,booking_mode,property_type/);
});

test('guest tracking token is cryptographically generated and stored only as a hash', () => {
  assert.match(guestApi, /randomBytes\(32\)\.toString\("base64url"\)/);
  assert.match(guestApi, /createHash\("sha256"\)/);
  assert.match(guestApi, /guest_access_token_hash: tokenHash\(accessToken\)/);
  assert.match(guestApi, /guest_access_token_hash=eq\./);
});

test('booking request rate limit is performed atomically server-side', () => {
  assert.match(guestApi, /createHmac\("sha256", serviceKey\)/);
  assert.match(guestApi, /\/rest\/v1\/rpc\/try_consume_booking_rate_limit/);
  assert.match(guestApi, /p_max_requests:\s*8/);
  assert.doesNotMatch(guestApi, /\/rest\/v1\/booking_rate_limits\?select=id/);
});

test('guest cannot cancel a confirmed reservation through the public endpoint', () => {
  assert.match(guestApi, /status=eq\.pending/);
  assert.match(guestApi, /Only pending requests can be cancelled online/);
});

test('host endpoint validates the Supabase session and derives actor from Auth', () => {
  assert.match(hostApi, /\/auth\/v1\/user/);
  assert.match(hostApi, /Authorization:\s*`Bearer \$\{token\}`/);
  assert.match(hostApi, /p_actor_user_id:\s*user\.id/);
  assert.match(hostApi, /\/rest\/v1\/rpc\/respond_to_booking_request/);
  assert.doesNotMatch(hostApi, /body\.p_actor_is_admin|body\.actor_user_id/);
});

test('server role keys never appear in browser application source', () => {
  const source = sourceFiles('src').map((file) => read(file)).join('\n');
  assert.doesNotMatch(source, /SUPABASE_SERVICE_ROLE_KEY|service_role_key/i);
});

test('server functions do not enable wildcard CORS', () => {
  const serverFiles = sourceFiles('netlify/functions').filter((file) => file.endsWith('.js'));
  for (const file of serverFiles) {
    assert.doesNotMatch(read(file), /Access-Control-Allow-Origin["']?\s*:\s*["']\*["']/i, file);
  }
});

test('Netlify handlers load as ES modules under this repository package configuration', () => {
  assert.equal(typeof publicPropertiesHandler, 'function');
  assert.equal(typeof guestBookingsHandler, 'function');
  assert.equal(typeof hostBookingsHandler, 'function');
  assert.match(publicApi, /export const handler = async/);
  assert.match(guestApi, /export const handler = async/);
  assert.match(hostApi, /export const handler = async/);
  assert.doesNotMatch(publicApi + guestApi + hostApi, /exports\\.handler|require\\(["']crypto["']\\)/);
});
