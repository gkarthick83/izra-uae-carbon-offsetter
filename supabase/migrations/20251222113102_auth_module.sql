-- Location: supabase/migrations/20251222113102_auth_module.sql
-- Schema Analysis: No existing schema (FRESH_PROJECT)
-- Integration Type: NEW_MODULE - Complete authentication system
-- Dependencies: None (initial migration)

-- ========================================
-- 1. CUSTOM TYPES
-- ========================================

CREATE TYPE public.user_role AS ENUM (
  'admin',
  'seller', 
  'buyer',
  'investor',
  'sponsor'
);

CREATE TYPE public.kyc_status AS ENUM (
  'pending',
  'verified',
  'rejected'
);

-- ========================================
-- 2. CORE TABLES
-- ========================================

-- User Profiles (intermediary table - CRITICAL for PostgREST compatibility)
CREATE TABLE public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  role public.user_role NOT NULL DEFAULT 'buyer'::public.user_role,
  avatar_url TEXT,
  phone TEXT,
  country TEXT DEFAULT 'UAE',
  kyc_status public.kyc_status DEFAULT 'pending'::public.kyc_status,
  kyc_documents JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE public.user_profiles IS 'User profile information with role-based access control';
COMMENT ON COLUMN public.user_profiles.role IS 'User role: admin, seller, buyer, investor, or sponsor';
COMMENT ON COLUMN public.user_profiles.kyc_status IS 'KYC verification status for sellers and investors';

-- ========================================
-- 3. INDEXES
-- ========================================

CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_user_profiles_role ON public.user_profiles(role);
CREATE INDEX idx_user_profiles_kyc_status ON public.user_profiles(kyc_status);
CREATE INDEX idx_user_profiles_created_at ON public.user_profiles(created_at DESC);

-- ========================================
-- 4. FUNCTIONS (MUST BE BEFORE RLS POLICIES)
-- ========================================

-- Function to handle automatic profile creation on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_profiles (
    id, 
    email, 
    full_name, 
    role, 
    avatar_url,
    phone,
    country
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE((NEW.raw_user_meta_data->>'role')::public.user_role, 'buyer'::public.user_role),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    COALESCE(NEW.raw_user_meta_data->>'country', 'UAE')
  );
  RETURN NEW;
END;
$$;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$;

-- Admin role check function (uses auth.users metadata)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM auth.users au
    WHERE au.id = auth.uid() 
    AND (
      au.raw_user_meta_data->>'role' = 'admin' 
      OR au.raw_app_meta_data->>'role' = 'admin'
    )
  )
$$;

-- ========================================
-- 5. ROW LEVEL SECURITY (RLS)
-- ========================================

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Pattern 1: Core user table - Simple ownership, no functions
CREATE POLICY "users_view_own_profile"
ON public.user_profiles
FOR SELECT
TO authenticated
USING (id = auth.uid());

CREATE POLICY "users_update_own_profile"
ON public.user_profiles
FOR UPDATE
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- Pattern 6: Admin access using auth.users metadata
CREATE POLICY "admin_full_access_user_profiles"
ON public.user_profiles
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- ========================================
-- 6. TRIGGERS
-- ========================================

-- Trigger to create user profile automatically on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Trigger to update updated_at timestamp
CREATE TRIGGER on_user_profile_updated
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- ========================================
-- 7. MOCK DATA (FOR TESTING)
-- ========================================

DO $$
DECLARE
  admin_id UUID := gen_random_uuid();
  seller_id UUID := gen_random_uuid();
  buyer_id UUID := gen_random_uuid();
  investor_id UUID := gen_random_uuid();
  sponsor_id UUID := gen_random_uuid();
BEGIN
  -- Create auth users with complete field structure
  INSERT INTO auth.users (
    id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
    created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
    is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
    recovery_token, recovery_sent_at, email_change_token_new, email_change,
    email_change_sent_at, email_change_token_current, email_change_confirm_status,
    reauthentication_token, reauthentication_sent_at, phone, phone_change,
    phone_change_token, phone_change_sent_at
  ) VALUES
    -- Admin User
    (
      admin_id, 
      '00000000-0000-0000-0000-000000000000', 
      'authenticated', 
      'authenticated',
      'admin@izra.ae', 
      crypt('admin123', gen_salt('bf', 10)), 
      now(), 
      now(), 
      now(),
      '{"full_name": "Admin User", "role": "admin", "country": "UAE"}'::jsonb,
      '{"provider": "email", "providers": ["email"]}'::jsonb,
      false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null
    ),
    -- Seller User
    (
      seller_id,
      '00000000-0000-0000-0000-000000000000',
      'authenticated',
      'authenticated',
      'seller@izra.ae',
      crypt('seller123', gen_salt('bf', 10)),
      now(),
      now(),
      now(),
      '{"full_name": "Carbon Seller", "role": "seller", "country": "UAE", "phone": "+971501234567"}'::jsonb,
      '{"provider": "email", "providers": ["email"]}'::jsonb,
      false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null
    ),
    -- Buyer User
    (
      buyer_id,
      '00000000-0000-0000-0000-000000000000',
      'authenticated',
      'authenticated',
      'buyer@izra.ae',
      crypt('buyer123', gen_salt('bf', 10)),
      now(),
      now(),
      now(),
      '{"full_name": "Carbon Buyer", "role": "buyer", "country": "UAE", "phone": "+971507654321"}'::jsonb,
      '{"provider": "email", "providers": ["email"]}'::jsonb,
      false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null
    ),
    -- Investor User
    (
      investor_id,
      '00000000-0000-0000-0000-000000000000',
      'authenticated',
      'authenticated',
      'investor@izra.ae',
      crypt('investor123', gen_salt('bf', 10)),
      now(),
      now(),
      now(),
      '{"full_name": "IZRA Investor", "role": "investor", "country": "UAE", "phone": "+971509876543"}'::jsonb,
      '{"provider": "email", "providers": ["email"]}'::jsonb,
      false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null
    ),
    -- Sponsor User
    (
      sponsor_id,
      '00000000-0000-0000-0000-000000000000',
      'authenticated',
      'authenticated',
      'sponsor@izra.ae',
      crypt('sponsor123', gen_salt('bf', 10)),
      now(),
      now(),
      now(),
      '{"full_name": "Tree Sponsor", "role": "sponsor", "country": "UAE", "phone": "+971503456789"}'::jsonb,
      '{"provider": "email", "providers": ["email"]}'::jsonb,
      false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null
    );

  RAISE NOTICE 'Mock users created successfully';
  RAISE NOTICE 'Admin: admin@izra.ae / admin123';
  RAISE NOTICE 'Seller: seller@izra.ae / seller123';
  RAISE NOTICE 'Buyer: buyer@izra.ae / buyer123';
  RAISE NOTICE 'Investor: investor@izra.ae / investor123';
  RAISE NOTICE 'Sponsor: sponsor@izra.ae / sponsor123';

EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'Error creating mock data: %', SQLERRM;
END $$;