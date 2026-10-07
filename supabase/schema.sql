-- ====================================================================
-- UTTARKUNTH STAYS: PRODUCTION DATABASE MIGRATION SCRIPT
-- PostgreSQL 15+ / Supabase Schema
-- Includes: RLS, Enums, Tables, Indexes, Constraints, and Atomic Booking Logic
-- ====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('guest', 'host', 'admin', 'super_admin');
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE property_status AS ENUM ('draft', 'pending_review', 'approved', 'rejected', 'suspended', 'archived');
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE reservation_status_type AS ENUM (
        'pending_payment', 'booking_requested', 'confirmed', 'checked_in',
        'completed', 'cancelled', 'declined', 'expired', 'no_show'
    );
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

-- 3. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    profile_photo_url TEXT,
    role user_role DEFAULT 'guest' NOT NULL,
    country TEXT DEFAULT 'India',
    state TEXT,
    city TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'deactivated')),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 4. HOSTS TABLE
CREATE TABLE IF NOT EXISTS public.hosts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    host_status TEXT DEFAULT 'pending' CHECK (host_status IN ('pending', 'approved', 'rejected', 'suspended')),
    verification_status TEXT DEFAULT 'unverified' CHECK (verification_status IN ('unverified', 'submitted', 'verified')),
    identity_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,
    email_verified BOOLEAN DEFAULT FALSE,
    payout_status TEXT DEFAULT 'not_configured' CHECK (payout_status IN ('not_configured', 'pending', 'active')),
    agreement_status TEXT DEFAULT 'none' CHECK (agreement_status IN ('none', 'pending', 'active', 'expired')),
    agreement_start_date DATE,
    agreement_end_date DATE,
    introductory_commission_rate NUMERIC(5,2) DEFAULT 0.00 NOT NULL, -- 0% during Year 1
    standard_commission_rate NUMERIC(5,2) DEFAULT 10.00 NOT NULL,   -- 10% after Year 1
    current_commission_rate NUMERIC(5,2) DEFAULT 0.00 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 5. HOST AGREEMENTS TABLE (Immutable historical records)
CREATE TABLE IF NOT EXISTS public.host_agreements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    host_id UUID NOT NULL REFERENCES public.hosts(id) ON DELETE CASCADE,
    agreement_version TEXT NOT NULL DEFAULT 'v1.0-2026',
    agreement_status TEXT NOT NULL CHECK (agreement_status IN ('draft', 'active', 'superseded', 'terminated')),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    introductory_commission_rate NUMERIC(5,2) NOT NULL DEFAULT 0.00,
    standard_commission_rate NUMERIC(5,2) NOT NULL DEFAULT 10.00,
    accepted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    accepted_ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 6. PROPERTIES TABLE
CREATE TABLE IF NOT EXISTS public.properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    host_id UUID NOT NULL REFERENCES public.hosts(id) ON DELETE RESTRICT,
    property_name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    property_type TEXT NOT NULL CHECK (property_type IN ('homestay', 'eco_lodge', 'heritage_cottage', 'retreat', 'farmstay')),
    description TEXT NOT NULL,
    short_description TEXT,
    address TEXT NOT NULL,
    locality TEXT,
    city TEXT NOT NULL,
    district TEXT NOT NULL,
    state TEXT NOT NULL DEFAULT 'Himachal Pradesh',
    country TEXT NOT NULL DEFAULT 'India',
    postal_code TEXT,
    latitude NUMERIC(10,7) NOT NULL,
    longitude NUMERIC(10,7) NOT NULL,
    google_place_id TEXT,
    check_in_time TIME DEFAULT '12:00:00',
    check_out_time TIME DEFAULT '11:00:00',
    status property_status DEFAULT 'draft' NOT NULL,
    verification_status TEXT DEFAULT 'unverified' CHECK (verification_status IN ('unverified', 'inspected', 'verified')),
    cancellation_policy TEXT DEFAULT 'moderate' CHECK (cancellation_policy IN ('flexible', 'moderate', 'strict', 'custom')),
    house_rules JSONB DEFAULT '[]'::jsonb,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 7. PROPERTY IMAGES TABLE
CREATE TABLE IF NOT EXISTS public.property_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    storage_path TEXT NOT NULL,
    public_url TEXT NOT NULL,
    display_order INT DEFAULT 0,
    caption TEXT,
    is_cover BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 8. AMENITIES TABLE
CREATE TABLE IF NOT EXISTS public.amenities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    icon_name TEXT NOT NULL,
    category TEXT DEFAULT 'general' CHECK (category IN ('general', 'view', 'kitchen', 'workspace', 'outdoors', 'heating'))
);

CREATE TABLE IF NOT EXISTS public.property_amenities (
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
    amenity_id UUID REFERENCES public.amenities(id) ON DELETE CASCADE,
    PRIMARY KEY (property_id, amenity_id)
);

-- 9. ROOM TYPES TABLE
CREATE TABLE IF NOT EXISTS public.room_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    max_guests INT NOT NULL DEFAULT 2,
    base_price NUMERIC(10,2) NOT NULL,
    weekend_price NUMERIC(10,2),
    extra_guest_price NUMERIC(10,2) DEFAULT 0.00,
    inventory_count INT NOT NULL DEFAULT 1,
    minimum_stay INT DEFAULT 1,
    maximum_stay INT DEFAULT 30,
    booking_mode TEXT DEFAULT 'instant' CHECK (booking_mode IN ('instant', 'request_to_book')),
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 10. ROOM INVENTORY CALENDAR (Day-by-day availability ledger)
CREATE TABLE IF NOT EXISTS public.room_inventory_calendar (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    room_type_id UUID NOT NULL REFERENCES public.room_types(id) ON DELETE CASCADE,
    calendar_date DATE NOT NULL,
    total_inventory INT NOT NULL,
    booked_inventory INT NOT NULL DEFAULT 0,
    blocked_inventory INT NOT NULL DEFAULT 0,
    custom_price NUMERIC(10,2),
    is_blocked BOOLEAN DEFAULT FALSE,
    CONSTRAINT unique_room_date UNIQUE (room_type_id, calendar_date),
    CONSTRAINT inventory_check CHECK (booked_inventory + blocked_inventory <= total_inventory)
);

-- 11. INVENTORY HOLDS TABLE (Temporary 15-minute checkout reservation hold)
CREATE TABLE IF NOT EXISTS public.inventory_holds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id TEXT NOT NULL,
    room_type_id UUID NOT NULL REFERENCES public.room_types(id) ON DELETE CASCADE,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    rooms_held INT NOT NULL DEFAULT 1,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 12. RESERVATIONS TABLE
CREATE TABLE IF NOT EXISTS public.reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_reference TEXT UNIQUE NOT NULL, -- UKS-2026-000001
    guest_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE RESTRICT,
    room_type_id UUID NOT NULL REFERENCES public.room_types(id) ON DELETE RESTRICT,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    number_of_guests INT NOT NULL DEFAULT 1,
    number_of_rooms INT NOT NULL DEFAULT 1,
    base_amount NUMERIC(10,2) NOT NULL,
    taxes NUMERIC(10,2) DEFAULT 0.00,
    additional_fees NUMERIC(10,2) DEFAULT 0.00,
    discount NUMERIC(10,2) DEFAULT 0.00,
    total_amount NUMERIC(10,2) NOT NULL,
    applied_commission_rate NUMERIC(5,2) NOT NULL, -- Stored forever per booking
    platform_commission_amount NUMERIC(10,2) NOT NULL,
    host_payout_amount NUMERIC(10,2) NOT NULL,
    payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'processing', 'paid', 'failed', 'refunded', 'partially_refunded')),
    reservation_status reservation_status_type DEFAULT 'pending_payment' NOT NULL,
    booking_source TEXT DEFAULT 'direct_web',
    special_requests TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 13. PAYMENTS TABLE
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reservation_id UUID NOT NULL REFERENCES public.reservations(id) ON DELETE CASCADE,
    razorpay_order_id TEXT NOT NULL,
    razorpay_payment_id TEXT,
    razorpay_signature TEXT,
    amount NUMERIC(10,2) NOT NULL,
    currency TEXT DEFAULT 'INR',
    status TEXT NOT NULL CHECK (status IN ('created', 'authorized', 'captured', 'failed', 'refunded')),
    payment_method TEXT,
    paid_at TIMESTAMPTZ,
    refund_status TEXT DEFAULT 'none' CHECK (refund_status IN ('none', 'requested', 'processed', 'failed')),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 14. HOST PAYOUTS TABLE
CREATE TABLE IF NOT EXISTS public.host_payouts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    host_id UUID NOT NULL REFERENCES public.hosts(id) ON DELETE RESTRICT,
    reservation_id UUID NOT NULL REFERENCES public.reservations(id) ON DELETE RESTRICT,
    gross_booking_amount NUMERIC(10,2) NOT NULL,
    commission_rate NUMERIC(5,2) NOT NULL,
    commission_amount NUMERIC(10,2) NOT NULL,
    applicable_adjustments NUMERIC(10,2) DEFAULT 0.00,
    payout_amount NUMERIC(10,2) NOT NULL,
    payout_status TEXT DEFAULT 'simulated_test' CHECK (payout_status IN ('simulated_test', 'pending', 'processed', 'on_hold', 'failed')),
    payout_reference TEXT,
    payout_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 15. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reservation_id UUID UNIQUE NOT NULL REFERENCES public.reservations(id) ON DELETE CASCADE,
    guest_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE RESTRICT,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    cleanliness INT CHECK (cleanliness BETWEEN 1 AND 5),
    hospitality INT CHECK (hospitality BETWEEN 1 AND 5),
    location INT CHECK (location BETWEEN 1 AND 5),
    value INT CHECK (value BETWEEN 1 AND 5),
    title TEXT NOT NULL,
    review TEXT NOT NULL,
    host_response TEXT,
    status TEXT DEFAULT 'published' CHECK (status IN ('published', 'hidden', 'flagged')),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 16. AUDIT LOGS TABLE
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id UUID NOT NULL,
    details JSONB,
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hosts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.host_agreements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_inventory_calendar ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_holds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.host_payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Properties: Public can view approved properties
CREATE POLICY "Public approved properties" ON public.properties
    FOR SELECT USING (status = 'approved');

-- Properties: Hosts can manage their own properties
CREATE POLICY "Hosts manage own properties" ON public.properties
    FOR ALL USING (
        host_id IN (SELECT id FROM public.hosts WHERE user_id = auth.uid())
    );

-- Reservations: Guests can view their own bookings
CREATE POLICY "Guests view own reservations" ON public.reservations
    FOR SELECT USING (guest_id = auth.uid());

-- Reservations: Hosts can view bookings for their properties
CREATE POLICY "Hosts view own property reservations" ON public.reservations
    FOR SELECT USING (
        property_id IN (
            SELECT p.id FROM public.properties p
            JOIN public.hosts h ON p.host_id = h.id
            WHERE h.user_id = auth.uid()
        )
    );

-- Reviews: Everyone can read published reviews
CREATE POLICY "Public read published reviews" ON public.reviews
    FOR SELECT USING (status = 'published');

-- ====================================================================
-- ATOMIC AVAILABILITY CHECK & BOOKING FUNCTION (PREVENTS DOUBLE BOOKINGS)
-- ====================================================================

CREATE OR REPLACE FUNCTION public.confirm_booking_atomic(
    p_guest_id UUID,
    p_property_id UUID,
    p_room_type_id UUID,
    p_check_in DATE,
    p_check_out DATE,
    p_guests INT,
    p_rooms INT,
    p_base_amount NUMERIC,
    p_taxes NUMERIC,
    p_total_amount NUMERIC,
    p_razorpay_order_id TEXT,
    p_razorpay_payment_id TEXT,
    p_razorpay_signature TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_host_id UUID;
    v_commission_rate NUMERIC;
    v_commission_amount NUMERIC;
    v_host_payout NUMERIC;
    v_booking_ref TEXT;
    v_reservation_id UUID;
    v_available_rooms INT;
    v_date_cursor DATE;
    v_total_inv INT;
    v_booked_inv INT;
    v_blocked_inv INT;
BEGIN
    -- 1. Identify host and active commission rate
    SELECT p.host_id, h.current_commission_rate
    INTO v_host_id, v_commission_rate
    FROM public.properties p
    JOIN public.hosts h ON p.host_id = h.id
    WHERE p.id = p_property_id;

    IF v_host_id IS NULL THEN
        RAISE EXCEPTION 'Property or Host not found.';
    END IF;

    -- 2. Verify and Lock Inventory for each date in range (FOR UPDATE)
    v_date_cursor := p_check_in;
    WHILE v_date_cursor < p_check_out LOOP
        SELECT total_inventory, booked_inventory, blocked_inventory
        INTO v_total_inv, v_booked_inv, v_blocked_inv
        FROM public.room_inventory_calendar
        WHERE room_type_id = p_room_type_id AND calendar_date = v_date_cursor
        FOR UPDATE;

        -- If no explicit record yet, get total from room_types
        IF v_total_inv IS NULL THEN
            SELECT inventory_count INTO v_total_inv FROM public.room_types WHERE id = p_room_type_id;
            v_booked_inv := 0;
            v_blocked_inv := 0;
            INSERT INTO public.room_inventory_calendar (room_type_id, calendar_date, total_inventory, booked_inventory, blocked_inventory)
            VALUES (p_room_type_id, v_date_cursor, v_total_inv, 0, 0);
        END IF;

        IF (v_booked_inv + v_blocked_inv + p_rooms) > v_total_inv THEN
            RAISE EXCEPTION 'Dates are no longer available. Please select another room or date.';
        END IF;

        -- Increment booked inventory
        UPDATE public.room_inventory_calendar
        SET booked_inventory = booked_inventory + p_rooms
        WHERE room_type_id = p_room_type_id AND calendar_date = v_date_cursor;

        v_date_cursor := v_date_cursor + INTERVAL '1 day';
    END LOOP;

    -- 3. Calculate Financials
    v_commission_amount := ROUND((p_total_amount * v_commission_rate / 100.0), 2);
    v_host_payout := p_total_amount - v_commission_amount;
    v_booking_ref := 'UKS-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(FLOOR(RANDOM() * 900000 + 100000)::TEXT, 6, '0');

    -- 4. Create Reservation
    INSERT INTO public.reservations (
        booking_reference, guest_id, property_id, room_type_id,
        check_in, check_out, number_of_guests, number_of_rooms,
        base_amount, taxes, total_amount,
        applied_commission_rate, platform_commission_amount, host_payout_amount,
        payment_status, reservation_status
    ) VALUES (
        v_booking_ref, p_guest_id, p_property_id, p_room_type_id,
        p_check_in, p_check_out, p_guests, p_rooms,
        p_base_amount, p_taxes, p_total_amount,
        v_commission_rate, v_commission_amount, v_host_payout,
        'paid', 'confirmed'
    ) RETURNING id INTO v_reservation_id;

    -- 5. Record Payment
    INSERT INTO public.payments (
        reservation_id, razorpay_order_id, razorpay_payment_id, razorpay_signature,
        amount, status, paid_at
    ) VALUES (
        v_reservation_id, p_razorpay_order_id, p_razorpay_payment_id, p_razorpay_signature,
        p_total_amount, 'captured', NOW()
    );

    -- 6. Record Simulated Host Payout Ledger
    INSERT INTO public.host_payouts (
        host_id, reservation_id, gross_booking_amount,
        commission_rate, commission_amount, payout_amount,
        payout_status, payout_reference, payout_date
    ) VALUES (
        v_host_id, v_reservation_id, p_total_amount,
        v_commission_rate, v_commission_amount, v_host_payout,
        'simulated_test', 'PAYOUT-SIM-' || v_booking_ref, CURRENT_DATE + INTERVAL '2 days'
    );

    RETURN jsonb_build_object(
        'success', TRUE,
        'reservation_id', v_reservation_id,
        'booking_reference', v_booking_ref,
        'commission_rate', v_commission_rate,
        'host_payout', v_host_payout
    );
END;
$$;
