-- login_/_signup table (auth/session metadata for login-signup flows)
CREATE TABLE IF NOT EXISTS "login_/_signup" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE "login_/_signup" ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "login_signup_read_own" ON "login_/_signup"
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own data
CREATE POLICY "login_signup_insert_own" ON "login_/_signup"
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own data
CREATE POLICY "login_signup_update_own" ON "login_/_signup"
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own data
CREATE POLICY "login_signup_delete_own" ON "login_/_signup"
  FOR DELETE USING (auth.uid() = user_id);

-- Optional: updated_at trigger
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS login_signup_updated_at ON "login_/_signup";
CREATE TRIGGER login_signup_updated_at
  BEFORE UPDATE ON "login_/_signup"
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
