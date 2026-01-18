# Database Setup Guide

This guide will help you set up the Supabase database for the symposium website.

## Prerequisites

- A Supabase account (sign up at https://supabase.com)
- Basic knowledge of SQL

## Step 1: Create a Supabase Project

1. Go to https://supabase.com and sign in
2. Click "New Project"
3. Fill in your project details:
   - **Name**: Symposium Website (or your preferred name)
   - **Database Password**: Choose a strong password (save this securely)
   - **Region**: Choose the closest region to your users
4. Click "Create new project" and wait for it to be provisioned (takes ~2 minutes)

## Step 2: Get Your Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. You'll need these values:
   - **Project URL** (under "Project URL")
   - **anon public** key (under "Project API keys" → "anon public")
   - **service_role** key (under "Project API keys" → "service_role") ⚠️ Keep this secret!

## Step 3: Create the Registrations Table

1. In your Supabase project, go to **SQL Editor**
2. Click "New query"
3. Paste and run the following SQL:

```sql
-- Create registrations table
CREATE TABLE IF NOT EXISTS registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  college TEXT NOT NULL,
  department TEXT NOT NULL,
  year_of_study TEXT NOT NULL,
  selected_events TEXT[] NOT NULL,
  registered_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);

-- Create index on registered_at for sorting
CREATE INDEX IF NOT EXISTS idx_registrations_registered_at ON registrations(registered_at);

-- Enable Row Level Security (RLS)
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role to insert (for API)
-- Note: The service role key bypasses RLS, so this is mainly for documentation
CREATE POLICY "Allow service role full access"
  ON registrations
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

4. Click "Run" to execute the query

## Step 4: Verify the Table

1. Go to **Table Editor** in your Supabase dashboard
2. You should see the `registrations` table
3. Click on it to view its structure

## Step 5: Set Up Environment Variables

Copy the `.env.local.example` file to `.env.local` and fill in your values:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
ORGANIZER_EMAIL=organizer@yourdomain.com
RESEND_API_KEY=your-resend-api-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

⚠️ **Important**: Never commit `.env.local` to version control!

## Alternative: Using Firebase

If you prefer Firebase over Supabase, you'll need to:

1. Create a Firebase project at https://firebase.google.com
2. Enable Firestore Database
3. Create a collection named `registrations`
4. Update the API routes to use Firebase Admin SDK instead of Supabase

## Troubleshooting

### "relation does not exist" error
- Make sure you ran the SQL script in the correct database
- Check that the table name is exactly `registrations`

### "permission denied" error
- Ensure you're using the service_role key (not anon key) for server-side operations
- Check that RLS policies are set up correctly

### Connection timeout
- Verify your Supabase project URL is correct
- Check if your region is accessible
- Ensure your firewall isn't blocking the connection
