# Google Sheets Integration Setup Guide

This guide will help you set up automatic registration data saving to Google Sheets.

## 📋 Overview

When someone registers through your website, their information will automatically be added to a Google Sheet. This allows you to:
- View all registrations in one place
- Share registration data with team members
- Export data easily
- Track registrations in real-time

## 🚀 Quick Setup (Step-by-Step)

### Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it (e.g., "Symposium Registrations 2024")
4. **Add headers in Row 1** (in this exact order):
   ```
   A1: Registration Date & Time
   B1: Name
   C1: Email
   D1: Phone
   E1: College
   F1: Department
   G1: Year of Study
   H1: Selected Events
   ```

5. **Get your Spreadsheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit
   ```
   Copy the `SPREADSHEET_ID_HERE` part (long alphanumeric string)

### Step 2: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account
3. Click "Select a project" → "New Project"
4. Enter project name: "Symposium Website" (or any name)
5. Click "Create"
6. Wait for project to be created (takes ~30 seconds)

### Step 3: Enable Google Sheets API

1. In your Google Cloud project, go to **APIs & Services** → **Library**
2. Search for "Google Sheets API"
3. Click on it and press **"Enable"**
4. Wait for it to enable (takes a few seconds)

### Step 4: Create Service Account

1. Go to **APIs & Services** → **Credentials**
2. Click **"Create Credentials"** → **"Service Account"**
3. Fill in the details:
   - **Service account name**: `symposium-sheets` (or any name)
   - **Service account ID**: Will auto-generate
   - **Description**: "Service account for symposium registration"
4. Click **"Create and Continue"**
5. Skip optional steps and click **"Done"**

### Step 5: Create and Download Service Account Key

1. In **Credentials** page, find your service account (ends with `@...iam.gserviceaccount.com`)
2. Click on it
3. Go to **"Keys"** tab
4. Click **"Add Key"** → **"Create new key"**
5. Select **JSON** format
6. Click **"Create"**
7. **A JSON file will download** - **SAVE THIS FILE SECURELY** (you'll need it)

### Step 6: Share Google Sheet with Service Account

1. Open the JSON file you just downloaded
2. Find the `"client_email"` field (looks like: `"service-account-name@project-id.iam.gserviceaccount.com"`)
3. **Copy this email address**
4. Go back to your Google Sheet
5. Click the **"Share"** button (top right)
6. Paste the service account email
7. Give it **"Editor"** permission
8. **Uncheck** "Notify people" (service accounts don't have email)
9. Click **"Share"**

### Step 7: Configure Environment Variables

1. Open your downloaded JSON key file
2. Find these values:
   - `client_email`: The service account email
   - `private_key`: The private key (starts with `-----BEGIN PRIVATE KEY-----`)

3. Create or edit `.env.local` in your project root:

```env
# Google Sheets Configuration
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=service-account@project-id.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
```

**Important Notes:**
- Replace `your_spreadsheet_id_here` with the Spreadsheet ID from Step 1
- Replace the email with the `client_email` from your JSON file
- Replace `YOUR_PRIVATE_KEY_HERE` with the `private_key` from your JSON file
- Keep the quotes around `GOOGLE_PRIVATE_KEY` value
- The `\n` characters in the private key are important - don't remove them

**Example:**
```env
GOOGLE_SHEETS_SPREADSHEET_ID=1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
GOOGLE_SERVICE_ACCOUNT_EMAIL=symposium-sheets@my-project-123456.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
```

### Step 8: Test the Integration

1. **Restart your development server**:
   ```bash
   npm run dev
   ```

2. **Submit a test registration** through your website

3. **Check your Google Sheet** - you should see a new row with the registration data!

## 📊 Sheet Format

Your Google Sheet will have this structure:

| Registration Date & Time | Name | Email | Phone | College | Department | Year of Study | Selected Events |
|-------------------------|------|-------|-------|---------|------------|---------------|----------------|
| 12/25/2024, 10:30:00 AM | John Doe | john@example.com | +1234567890 | ABC College | Electronics | 3rd Year | Paper Presentation, El Casino |

## ✅ Verification Checklist

- [ ] Google Sheet created with correct headers
- [ ] Spreadsheet ID copied
- [ ] Google Cloud project created
- [ ] Google Sheets API enabled
- [ ] Service account created
- [ ] JSON key file downloaded
- [ ] Google Sheet shared with service account email (Editor permission)
- [ ] Environment variables added to `.env.local`
- [ ] Dev server restarted
- [ ] Test registration submitted
- [ ] Data appears in Google Sheet

## 🔧 Troubleshooting

### "Error: Missing environment variables"
- Check that all three Google Sheets variables are in `.env.local`
- Make sure the variable names are exactly as shown
- Restart your dev server after adding variables

### "Error: The caller does not have permission"
- Make sure you shared the Google Sheet with the service account email
- Give it "Editor" permission (not just Viewer)
- The email must match exactly (copy-paste from JSON file)

### "Error: Unable to parse range"
- Check that your sheet is named "Sheet1" (default name)
- If you renamed it, update the sheet name in `lib/googleSheets.ts`:
  ```typescript
  range: 'YourSheetName!A:H',
  ```

### "Error: Invalid credentials"
- Verify the `GOOGLE_PRIVATE_KEY` includes the full key (starts with `-----BEGIN PRIVATE KEY-----`)
- Make sure the key has `\n` characters (newlines) preserved
- The key should be in quotes in `.env.local`

### Data not appearing in sheet
- Check the browser console and terminal for errors
- Verify all environment variables are set correctly
- Make sure the service account has Editor permission on the sheet
- Check that headers are in Row 1, columns A-H

## 🔒 Security Notes

- **Never commit `.env.local` to Git** (already in `.gitignore`)
- **Never share your service account JSON file publicly**
- The service account key has access to edit your sheet - keep it secure
- In production, use environment variables in your hosting platform (Vercel/Netlify)

## 📝 Customization

### Change Sheet Name

If your sheet is not named "Sheet1", update `lib/googleSheets.ts`:

```typescript
range: 'YourSheetName!A:H',
```

### Change Column Order

To change which data goes in which column, modify the `rowData` array in `lib/googleSheets.ts`:

```typescript
const rowData = [
  timestamp,        // Column A
  data.name,        // Column B
  data.email,       // Column C
  // ... etc
]
```

And update your sheet headers accordingly.

### Multiple Events in Separate Columns

If you want each event as a separate column (instead of comma-separated), modify the code to create multiple columns per event.

## 🚀 Production Deployment

When deploying to Vercel/Netlify:

1. Go to your hosting platform's environment variables settings
2. Add the three Google Sheets variables:
   - `GOOGLE_SHEETS_SPREADSHEET_ID`
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`
3. Make sure to include the full private key with quotes
4. Redeploy your site

## 📚 Additional Resources

- [Google Sheets API Documentation](https://developers.google.com/sheets/api)
- [Google Cloud Service Accounts](https://cloud.google.com/iam/docs/service-accounts)
- [Google Sheets API Node.js Quickstart](https://developers.google.com/sheets/api/quickstart/nodejs)

## 💡 Tips

- Create a test sheet first to verify everything works
- Use a separate sheet for production vs development
- Set up sheet formatting (colors, borders) - data will appear below headers
- Consider adding filters to your sheet for easier data management
- You can create charts and graphs from the registration data!

---

**Need Help?** Check the troubleshooting section above or review the error messages in your terminal/console.
