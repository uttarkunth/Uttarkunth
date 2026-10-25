-- Additive hardening for public booking-request creation.
-- The function is server-only; the service-role key must never reach browser code.
create or replace function public.try_consume_booking_rate_limit(
  p_ip_hash text,
  p_max_requests integer,
  p_window_seconds integer
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_count integer;
  v_now timestamptz := pg_catalog.clock_timestamp();
begin
  if p_ip_hash is null or p_ip_hash !~ '^[0-9a-f]{64}$'
     or p_max_requests < 1 or p_max_requests > 100
     or p_window_seconds < 60 or p_window_seconds > 86400 then
    raise exception 'Invalid rate-limit input.';
  end if;

  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_ip_hash, 0));

  delete from public.booking_rate_limits
  where ip_hash = p_ip_hash
    and created_at < v_now - pg_catalog.make_interval(secs => p_window_seconds);

  select count(*)::integer into v_count
  from public.booking_rate_limits
  where ip_hash = p_ip_hash
    and created_at >= v_now - pg_catalog.make_interval(secs => p_window_seconds);

  if v_count >= p_max_requests then
    return false;
  end if;

  insert into public.booking_rate_limits (ip_hash, created_at)
  values (p_ip_hash, v_now);

  return true;
end;
$$;

revoke all on function public.try_consume_booking_rate_limit(text, integer, integer) from public;
revoke all on function public.try_consume_booking_rate_limit(text, integer, integer) from anon, authenticated;
grant execute on function public.try_consume_booking_rate_limit(text, integer, integer) to service_role;
