# Quick Start Guide

Get your symposium website up and running in 5 minutes!

## Step 1: Install Dependencies (2 minutes)

```bash
cd symposium-website
npm install
```

## Step 2: Set Up Supabase (2 minutes)

1. Go to https://supabase.com and create a free account
2. Create a new project
3. Go to **SQL Editor** and run this SQL:

```sql
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

ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
```

4. Go to **Settings** → **API** and copy:
   - Project URL
   - anon public key
   - service_role key

## Step 3: Set Up Email (1 minute)

1. Go to https://resend.com and sign up (free)
2. Get your API key from the dashboard
3. (For production) Verify your domain later

## Step 4: Configure Environment Variables

Create `.env.local` file:

```bash
cp env.example .env.local
```

Edit `.env.local` and fill in:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxxx
SUPABASE_SERVICE_ROLE_KEY=eyJxxxxx
ORGANIZER_EMAIL=your-email@example.com
RESEND_API_KEY=re_xxxxx
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Step 5: Run the Website!

```bash
npm run dev
```

Open http://localhost:3000 - You're done! 🎉

## What's Next?

- **Customize Events**: Edit `data/events.json`
- **Change Colors**: See `CUSTOMIZATION.md`
- **Deploy**: Follow `README.md` deployment section
- **Test Registration**: Fill out the form and check your emails!

## Troubleshooting

**"Missing Supabase environment variables"**
→ Check that `.env.local` exists and has all variables

**"Table does not exist"**
→ Make sure you ran the SQL script in Supabase

**Emails not sending**
→ Verify Resend API key is correct

## Need Help?

See the full documentation:
- `README.md` - Complete guide
- `DATABASE_SETUP.md` - Database details
- `EMAIL_SETUP.md` - Email configuration
- `CUSTOMIZATION.md` - Customization options
