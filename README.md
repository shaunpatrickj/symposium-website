# Technical Symposium Website

A modern, full-featured website for a college technical symposium with event pages, registration system, and email notifications.

## 🚀 Features

- **5 Event Pages**: Individual pages for each symposium event
- **Registration System**: Full-page registration form with validation
- **Email Notifications**: Automatic confirmation emails to users and organizers
- **Database Storage**: All registrations stored in Supabase
- **Google Sheets Integration**: Automatic saving of registrations to Google Sheets
- **CSV Export**: Export all registrations for administrative use
- **Responsive Design**: Beautiful dark theme with gold accents, mobile-friendly
- **Event Configuration**: Easy-to-edit JSON file for managing events

## 📋 Prerequisites

- Node.js 18+ and npm
- A Supabase account (free tier works) - for database storage
- A Resend account for emails (free tier available) - for email notifications
- Google Cloud account (free tier) - for Google Sheets integration (optional)
- (Optional) Vercel/Netlify account for deployment

## 🛠️ Installation

1. **Clone or download this project**

```bash
cd symposium-website
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Copy `.env.local.example` to `.env.local` and fill in your values:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
ORGANIZER_EMAIL=organizer@example.com
RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Set up the database**

Follow the instructions in [DATABASE_SETUP.md](./DATABASE_SETUP.md) to create the Supabase table.

5. **Set up email**

Follow the instructions in [EMAIL_SETUP.md](./EMAIL_SETUP.md) to configure email notifications.

6. **Set up Google Sheets (Optional)**

Follow the instructions in [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md) to enable automatic saving of registrations to Google Sheets.

7. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
symposium-website/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── register/      # Registration endpoint
│   │   └── export/        # CSV export endpoint
│   ├── events/[slug]/     # Dynamic event pages
│   ├── register/          # Registration form page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── EventCard.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── RegistrationForm.tsx
│   └── RegistrationFormWrapper.tsx
├── data/                  # Configuration files
│   └── events.json        # Event data (EDIT THIS!)
├── lib/                   # Utility functions
│   ├── events.ts          # Event helper functions
│   ├── supabase.ts        # Supabase client
│   └── googleSheets.ts    # Google Sheets integration
└── public/                # Static assets
```

## 🎨 Customization Guide

### Changing Events

Edit `data/events.json` to modify or add events:

```json
{
  "events": [
    {
      "id": "your-event-id",
      "name": "Your Event Name",
      "slug": "your-event-slug",
      "description": "Short description",
      "longDescription": "Detailed description",
      "rules": ["Rule 1", "Rule 2"],
      "prize": "Prize information"
    }
  ]
}
```

**Important**: 
- `id` must match the checkbox value in the registration form
- `slug` is used in the URL (e.g., `/events/your-event-slug`)
- After adding events, update the RegistrationForm component if needed

### Changing Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      gold: {
        // Modify these values to change the accent color
        500: '#your-gold-color',
      },
    },
  },
}
```

Or edit `app/globals.css` to change the CSS variables:

```css
:root {
  --gold: #your-color;
  --bg-dark: #your-background;
}
```

### Changing Organizer Email

Update the `ORGANIZER_EMAIL` environment variable in `.env.local`:

```env
ORGANIZER_EMAIL=new-organizer@example.com
```

### Modifying Form Fields

1. **Add/Remove fields in the form**:
   - Edit `components/RegistrationForm.tsx`
   - Add new input fields in the JSX
   - Update the `FormData` interface
   - Add validation in the `validate()` function

2. **Update the database schema**:
   - Add new columns to the `registrations` table in Supabase
   - Update the API route `app/api/register/route.ts` to save new fields

3. **Update email templates**:
   - Edit `app/api/register/route.ts`
   - Modify `sendUserConfirmationEmail()` and `sendOrganizerNotification()`

## 📧 Email Configuration

The system sends two emails per registration:

1. **User Confirmation**: Sent to the registrant's email
2. **Organizer Notification**: Sent to the organizer email

See [EMAIL_SETUP.md](./EMAIL_SETUP.md) for detailed setup instructions.

## 📊 Google Sheets Integration

When a user registers, their information is automatically saved to a Google Sheet. This allows you to:
- View all registrations in one place
- Share data with team members easily
- Export and analyze registration data
- Track registrations in real-time

See [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md) for detailed setup instructions.

**Note**: Google Sheets integration is optional. If not configured, registrations will still be saved to the database and emails will still be sent.

## 🗄️ Database

All registrations are stored in a Supabase PostgreSQL database. See [DATABASE_SETUP.md](./DATABASE_SETUP.md) for setup instructions.

### Exporting Registrations (CSV)

Access the export endpoint:

```
GET /api/export
```

This returns a CSV file with all registrations. In production, you should add authentication to this endpoint.

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. In Netlify, click "New site from Git"
3. Select your repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Add environment variables in Netlify dashboard
6. Deploy!

### Environment Variables for Production

Make sure to set these in your hosting platform:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ORGANIZER_EMAIL`
- `RESEND_API_KEY`
- `NEXT_PUBLIC_APP_URL` (your production URL, e.g., `https://yoursite.com`)

## 🔒 Security Notes

- Never commit `.env.local` to version control
- The `SUPABASE_SERVICE_ROLE_KEY` should only be used server-side
- Consider adding authentication to the `/api/export` endpoint in production
- Validate all user inputs (already implemented)
- Use HTTPS in production

## 🐛 Troubleshooting

### "Missing Supabase environment variables" error
- Check that all Supabase variables are set in `.env.local`
- Restart the development server after adding environment variables

### Emails not sending
- Verify your Resend API key is correct
- Check Resend dashboard for logs and errors
- Ensure email addresses are valid

### Registration not saving
- Verify Supabase table is created correctly
- Check that service role key has proper permissions
- Look at Supabase logs for errors

### Build errors
- Make sure all dependencies are installed: `npm install`
- Check Node.js version (requires 18+)
- Clear `.next` folder and rebuild: `rm -rf .next && npm run build`

## 📝 License

This project is open source and available for educational use.

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the setup guides (DATABASE_SETUP.md, EMAIL_SETUP.md)
3. Check Next.js and Supabase documentation

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Resend Documentation](https://resend.com/docs)
# symposium-website# blitzkrieg2k26-website
