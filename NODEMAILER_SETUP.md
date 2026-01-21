# Nodemailer Setup Guide

This guide explains how to set up email notifications using Nodemailer with SMTP.

## 📋 Overview

Nodemailer works with any SMTP server, including:
- Gmail
- Outlook/Hotmail
- Yahoo
- Custom SMTP servers
- Office 365

## 🚀 Quick Setup - Gmail (Recommended for Testing)

### Step 1: Enable 2-Factor Authentication

1. Go to your Google Account: https://myaccount.google.com
2. Go to **Security**
3. Enable **2-Step Verification** (if not already enabled)

### Step 2: Generate App Password

1. Go to https://myaccount.google.com/apppasswords
2. Sign in with your Google account
3. Select **Mail** as the app
4. Select **Other (Custom name)** as the device
5. Enter "Symposium Website" as the name
6. Click **Generate**
7. **Copy the 16-character password** (you'll see it only once!)
   - Example: `abcd efgh ijkl mnop`

### Step 3: Configure Environment Variables

Add these to your `.env.local` file:

```env
# SMTP Configuration (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=abcd efgh ijkl mnop
SMTP_FROM=your-email@gmail.com
SMTP_FROM_NAME=Symposium

# Organizer Email (where notifications go)
ORGANIZER_EMAIL=active-email@example.com
```

**Important Notes:**
- `SMTP_PASSWORD` should be your **App Password** (not your regular Gmail password)
- Remove spaces from the App Password: `abcdefghijklmnop`
- `SMTP_USER` is your Gmail address
- `SMTP_FROM` should be the same as `SMTP_USER` (or you can use a different address if you have one verified)

## 📧 Other Email Providers

### Outlook/Hotmail

```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@outlook.com
SMTP_PASSWORD=your-password
SMTP_FROM=your-email@outlook.com
SMTP_FROM_NAME=Symposium
```

### Yahoo Mail

```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@yahoo.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=your-email@yahoo.com
SMTP_FROM_NAME=Symposium
```

**Note:** Yahoo also requires App Password (similar to Gmail).

### Office 365

```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@yourcompany.com
SMTP_PASSWORD=your-password
SMTP_FROM=your-email@yourcompany.com
SMTP_FROM_NAME=Symposium
```

### Custom SMTP Server

```env
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=noreply@yourdomain.com
SMTP_PASSWORD=your-password
SMTP_FROM=noreply@yourdomain.com
SMTP_FROM_NAME=Symposium
```

## 🔐 Environment Variables Explained

| Variable | Description | Example |
|----------|-------------|---------|
| `SMTP_HOST` | SMTP server address | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP port (usually 587 or 465) | `587` |
| `SMTP_SECURE` | Use SSL/TLS (true for 465, false for 587) | `false` |
| `SMTP_USER` | Your email username | `your-email@gmail.com` |
| `SMTP_PASSWORD` | Your email password or App Password | `abcdefghijklmnop` |
| `SMTP_FROM` | From email address | `your-email@gmail.com` |
| `SMTP_FROM_NAME` | Display name for sender | `Symposium` |

## ✅ Testing Your Configuration

### Step 1: Restart Your Server

```bash
npm run dev
```

### Step 2: Submit a Test Registration

1. Go to your registration form
2. Fill it out with a test email
3. Submit the form

### Step 3: Check Terminal Output

You should see:
```
📧 Attempting to send email to: test@example.com
✅ Email sent successfully!
Message ID: <message-id>
Sent to: test@example.com
```

### Step 4: Check Your Email

- Check inbox (and spam folder)
- Check organizer email inbox

## 🔧 Troubleshooting

### "Error: Invalid login"

**Problem:** Wrong username or password

**Solution:**
- Double-check `SMTP_USER` and `SMTP_PASSWORD` in `.env.local`
- For Gmail, make sure you're using **App Password** (not regular password)
- Restart your server after changing `.env.local`

### "Error: Connection timeout"

**Problem:** Wrong SMTP host or port

**Solution:**
- Verify `SMTP_HOST` is correct for your email provider
- Try port 465 with `SMTP_SECURE=true`
- Check if your firewall is blocking the connection

### "Error: Self-signed certificate"

**Problem:** SSL certificate issue

**Solution:**
- For testing, you can ignore this (emails will still work)
- For production, use a valid SSL certificate

### Gmail: "Less secure app access"

**Problem:** Gmail blocking the login

**Solution:**
- Use **App Password** instead of regular password (recommended)
- Enable 2-Step Verification first
- Generate App Password from https://myaccount.google.com/apppasswords

### Emails going to spam

**Problem:** Email provider marking emails as spam

**Solution:**
- Check spam/junk folder
- Add sender email to contacts
- Use a verified email address for `SMTP_FROM`
- For production, use your own domain with SPF/DKIM records

## 📝 Complete `.env.local` Example

```env
# Supabase Configuration (Optional)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Organizer Email (where admin notifications go)
ORGANIZER_EMAIL=admin@example.com

# SMTP Configuration (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=abcdefghijklmnop
SMTP_FROM=your-email@gmail.com
SMTP_FROM_NAME=Symposium

# Application URL
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Google Sheets (Optional)
GOOGLE_SHEETS_SPREADSHEET_ID=your_google_sheet_id
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

## 🎯 Quick Checklist

- [ ] 2-Step Verification enabled (for Gmail)
- [ ] App Password generated (for Gmail)
- [ ] All SMTP variables added to `.env.local`
- [ ] Server restarted after changes
- [ ] Test registration submitted
- [ ] Checked email inbox (and spam folder)
- [ ] Checked terminal for success messages

## 💡 Tips

- **For Testing:** Gmail with App Password works great
- **For Production:** Consider using a dedicated email service (SendGrid, Mailgun, etc.)
- **Security:** Never commit `.env.local` to Git (already in `.gitignore`)
- **Rate Limits:** Free Gmail accounts have daily sending limits (~500 emails/day)

## 📚 Additional Resources

- [Nodemailer Documentation](https://nodemailer.com/about/)
- [Gmail SMTP Settings](https://support.google.com/mail/answer/7126229)
- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)

---

**Need Help?** Check the troubleshooting section above or verify your SMTP settings match your email provider's requirements.
