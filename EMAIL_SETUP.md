# Email Setup Guide

This guide explains how to set up email notifications using Resend.

## Option 1: Resend (Recommended)

Resend is a modern email API that's easy to set up and has a generous free tier.

### Step 1: Create a Resend Account

1. Go to https://resend.com
2. Sign up for a free account
3. Verify your email address

### Step 2: Get Your API Key

1. In your Resend dashboard, go to **API Keys**
2. Click "Create API Key"
3. Give it a name (e.g., "Symposium Website")
4. Select appropriate permissions (send emails)
5. Copy the API key immediately (you won't see it again!)

### Step 3: Verify Your Domain (Production)

For production use, you should verify your domain:

1. Go to **Domains** in Resend
2. Click "Add Domain"
3. Enter your domain (e.g., `yourdomain.com`)
4. Follow the DNS configuration instructions
5. Once verified, you can use emails like `noreply@yourdomain.com`

### Step 4: Update Environment Variables

Add your Resend API key to `.env.local`:

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
```

### Step 5: Update Email "From" Address

In `app/api/register/route.ts`, update the `from` field:

```typescript
// For development (uses Resend's test domain)
from: 'Symposium <onboarding@resend.dev>'

// For production (after domain verification)
from: 'Symposium <noreply@yourdomain.com>'
```

## Option 2: EmailJS (Alternative)

If you prefer EmailJS for simpler setup:

1. Sign up at https://www.emailjs.com
2. Create an email service
3. Create an email template
4. Install EmailJS: `npm install @emailjs/browser`
5. Update the registration API route to use EmailJS

## Option 3: SMTP (Custom SMTP Server)

For custom SMTP servers (Gmail, SendGrid, etc.):

1. Install Nodemailer: `npm install nodemailer`
2. Update `app/api/register/route.ts` to use Nodemailer
3. Add SMTP credentials to environment variables:

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## Testing Email Setup

1. Start your development server: `npm run dev`
2. Submit a test registration
3. Check the email inboxes:
   - User email (confirmation)
   - Organizer email (notification)
4. Check the server logs for any email errors

## Troubleshooting

### Emails not sending
- Verify your API key is correct
- Check that the email addresses are valid
- Look at Resend dashboard → Logs for error messages
- Ensure you're not hitting rate limits

### "Unauthorized" error
- Double-check your API key
- Make sure you're using the correct environment variable name

### Domain not verified (production)
- For testing, use `onboarding@resend.dev` as the from address
- For production, complete domain verification first

## Email Customization

To customize email templates, edit the HTML in:
- `app/api/register/route.ts` → `sendUserConfirmationEmail()`
- `app/api/register/route.ts` → `sendOrganizerNotification()`

You can modify:
- Colors and styling
- Email content and messaging
- Logo or branding
- Additional information
