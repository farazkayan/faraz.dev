-- Run this SQL in your Supabase SQL Editor to set up the Ideas Vault

CREATE TABLE IF NOT EXISTS ideas (
  id TEXT PRIMARY KEY,
  idea TEXT NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'general',
  platform TEXT DEFAULT 'other',
  optional_name TEXT DEFAULT 'anonymous',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  might_build_count INTEGER DEFAULT 0
);

-- Enable Row Level Security (RLS)
ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;

-- Since we access this from a server-side backend API (using the Service Role key or Anon Key), 
-- we can keep RLS restrictive for direct public API access.
-- The public should NOT be able to read ideas.

-- Allow inserting pending ideas:
CREATE POLICY "Anyone can insert ideas" 
ON ideas FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- NO PUBLIC READ POLICIES SHOULD EXIST.
-- If you are using the Service Role Key on your backend, policies are bypassed automatically for admin routes.
-- Only the backend reads data.

-- Insert some dummy data to get started
INSERT INTO ideas (id, idea, description, category, platform, optional_name, status, might_build_count)
VALUES 
('IDEA-000001', 'An app that tells you which of your friends are actually free without messaging everyone.', 'It''s so annoying trying to coordinate hangouts.', 'social', 'mobile', 'josh', 'approved', 12),
('IDEA-000002', 'A better way to organize school assignments.', 'Canvas is too cluttered, I just want a simple timeline.', 'education', 'web', 'sarah', 'approved', 5)
ON CONFLICT (id) DO NOTHING;
