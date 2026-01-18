# Project Structure Overview

## 📂 Directory Structure

```
symposium-website/
│
├── app/                          # Next.js 14 App Router
│   ├── api/                      # API Routes (Backend)
│   │   ├── register/
│   │   │   └── route.ts         # Registration endpoint
│   │   └── export/
│   │       └── route.ts         # CSV export endpoint
│   │
│   ├── events/
│   │   └── [slug]/
│   │       └── page.tsx         # Dynamic event pages
│   │
│   ├── register/
│   │   ├── page.tsx             # Registration form page
│   │   └── success/
│   │       └── page.tsx         # Success confirmation page
│   │
│   ├── events/
│   │   └── page.tsx             # All events listing page
│   │
│   ├── layout.tsx               # Root layout (Navbar + Footer)
│   ├── page.tsx                 # Homepage
│   └── globals.css              # Global styles
│
├── components/                   # React Components
│   ├── EventCard.tsx            # Event card for listings
│   ├── Footer.tsx               # Site footer
│   ├── Navbar.tsx               # Navigation bar
│   ├── RegistrationForm.tsx     # Main registration form
│   └── RegistrationFormWrapper.tsx  # Wrapper for search params
│
├── data/                        # Configuration Data
│   └── events.json              # ⭐ EDIT THIS - Event configurations
│
├── lib/                         # Utility Functions
│   ├── events.ts                # Event data helpers
│   └── supabase.ts              # Supabase client setup
│
├── public/                      # Static Assets (optional)
│   └── (add images, logos here)
│
├── .gitignore                   # Git ignore rules
├── env.example                  # Environment variables template
├── next.config.js               # Next.js configuration
├── package.json                 # Dependencies
├── postcss.config.js            # PostCSS configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
│
└── Documentation Files:
    ├── README.md                # Main documentation
    ├── QUICK_START.md           # Quick setup guide
    ├── DATABASE_SETUP.md        # Database setup instructions
    ├── EMAIL_SETUP.md           # Email configuration guide
    ├── CUSTOMIZATION.md         # Customization guide
    └── PROJECT_STRUCTURE.md     # This file
```

## 🎯 Key Files to Edit

### For Content Changes

1. **`data/events.json`** - Edit events, descriptions, rules, prizes
2. **`app/page.tsx`** - Homepage content
3. **`components/Navbar.tsx`** - Navigation menu
4. **`components/Footer.tsx`** - Footer content

### For Styling Changes

1. **`tailwind.config.js`** - Colors, fonts, theme
2. **`app/globals.css`** - Global styles, CSS variables
3. **Individual component files** - Component-specific styles

### For Functionality Changes

1. **`components/RegistrationForm.tsx`** - Form fields and validation
2. **`app/api/register/route.ts`** - Registration logic, email templates
3. **`lib/supabase.ts`** - Database configuration

## 🔄 Data Flow

### Registration Process

```
User fills form
    ↓
RegistrationForm.tsx (validation)
    ↓
POST /api/register
    ↓
app/api/register/route.ts
    ↓
├─→ Save to Supabase (registrations table)
├─→ Send confirmation email to user
└─→ Send notification email to organizer
```

### Event Display

```
data/events.json
    ↓
lib/events.ts (getEvents function)
    ↓
├─→ app/page.tsx (homepage cards)
├─→ app/events/page.tsx (events listing)
└─→ app/events/[slug]/page.tsx (individual event pages)
```

## 📝 File Purposes

### Configuration Files

- **`package.json`** - Node.js dependencies and scripts
- **`tsconfig.json`** - TypeScript compiler settings
- **`tailwind.config.js`** - Tailwind CSS customization
- **`next.config.js`** - Next.js build settings
- **`.env.local`** - Environment variables (not in git)

### Component Files

- **`Navbar.tsx`** - Top navigation with logo and menu
- **`Footer.tsx`** - Site footer with links
- **`EventCard.tsx`** - Reusable event card component
- **`RegistrationForm.tsx`** - Main registration form with validation
- **`RegistrationFormWrapper.tsx`** - Handles URL parameters

### Page Files

- **`app/page.tsx`** - Landing page with hero and event cards
- **`app/events/page.tsx`** - All events listing page
- **`app/events/[slug]/page.tsx`** - Individual event detail pages
- **`app/register/page.tsx`** - Registration form page
- **`app/register/success/page.tsx`** - Success confirmation page

### API Routes

- **`app/api/register/route.ts`** - Handles registration submissions
- **`app/api/export/route.ts`** - Exports registrations as CSV

### Utility Files

- **`lib/events.ts`** - Functions to read and query event data
- **`lib/supabase.ts`** - Supabase client initialization

## 🔐 Security Notes

- **`.env.local`** - Contains secrets, never commit to git
- **`SUPABASE_SERVICE_ROLE_KEY`** - Only used server-side (API routes)
- **`NEXT_PUBLIC_*`** variables - Exposed to browser (safe for public data)

## 🚀 Build Process

1. **Development**: `npm run dev` - Runs Next.js dev server
2. **Build**: `npm run build` - Creates production build
3. **Start**: `npm start` - Runs production server
4. **Lint**: `npm run lint` - Checks code quality

## 📦 Dependencies

### Main Dependencies

- **next** - React framework
- **react** / **react-dom** - UI library
- **@supabase/supabase-js** - Database client
- **resend** - Email service

### Dev Dependencies

- **typescript** - Type safety
- **tailwindcss** - CSS framework
- **@types/node** / **@types/react** - TypeScript types

## 🔍 Where to Find Things

**Want to change...**

- **Event names/details** → `data/events.json`
- **Registration fields** → `components/RegistrationForm.tsx`
- **Email content** → `app/api/register/route.ts`
- **Colors/styling** → `tailwind.config.js` or `app/globals.css`
- **Homepage content** → `app/page.tsx`
- **Navigation links** → `components/Navbar.tsx`
- **Organizer email** → `.env.local` → `ORGANIZER_EMAIL`

## 📚 Learn More

- See `README.md` for full documentation
- See `CUSTOMIZATION.md` for detailed customization guide
- See `QUICK_START.md` for rapid setup
