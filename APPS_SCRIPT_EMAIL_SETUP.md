# 📧 Google Sheets Email Automation Guide

Yes, you can absolutely send automated emails to participants when they fill out the registration form on your website! 

Since your website sends data to Google Sheets via the API, the standard "On Form Submit" trigger (which is for Google Forms) **won't work**. Instead, we use a **Time-Driven Trigger** that checks the sheet every minute for new rows.

Follow this guide to set it up.

## 📋 Prerequisites

1.  You must have completed the **Google Sheets Setup** (connecting your website to the sheet).
2.  Your Google Sheet should have headers in Row 1.
3.  Columns should be configured as per the website setup:
    *   **Column B**: Name
    *   **Column C**: Email
    *   **Column H**: Selected Events
    *   *Note: We will use **Column I** for "Email Status".*

---

## 📂 Local File Reference

I've saved a copy of this script locally for you at:
`scripts/apps-script/Code.js`

You can edit it there if you want to keep a version-controlled copy, but remember to **copy-paste it back into the Google Apps Script editor** whenever you make changes.

## ⚠️ Important: Avoid Double Emails

Your website might already be configured to send emails via **Nodemailer** (check `.env.local`). 
- If you use **both** Nodemailer and this Google Sheets script, users will receive **two emails**.
- To use **ONLY** this Google Sheets method, you can remove the SMTP/Nodemailer variables from your `.env.local` file.

## ⚙️ Step 1: Open Apps Script

1.  Open your Google Sheet.
2.  Go to **Extensions** > **Apps Script**.
3.  A code editor will open in a new tab.

## 📝 Step 2: Add the Email Script

1.  Delete any existing code in `Code.gs`.
2.  Copy and paste the following code:

```javascript
/**
 * CONFIGURATION
 * -------------
 * Adjust these values if your sheet structure changes.
 */
const CONFIG = {
  // The name of the tab/sheet storing registrations. 
  // Default for new sheets is usually "Sheet1". CHECK THIS!
  SHEET_NAME: "Sheet1", 
  
  // Column numbers (1 = A, 2 = B, etc.)
  COLS: {
    NAME: 2,       // Col B: Name
    EMAIL: 3,      // Col C: Email
    EVENTS: 8,     // Col H: Selected Events
    STATUS: 9      // Col I: We will write "SENT" here
  },
  
  // Email details
  EMAIL_SUBJECT: "Registration Confirmed - BlitzKrieg 2K26",
  SENDER_NAME: "BlitzKrieg Team"
};

/**
 * MAIN FUNCTION
 * Run this to check for new registrations and send emails.
 */
function processRegistrations() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  
  if (!sheet) {
    console.error("Sheet not found: " + CONFIG.SHEET_NAME);
    return;
  }

  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return; // No data yet

  // 1. Ensure the Status Header exists in Column I (9)
  const statusHeaderCell = sheet.getRange(1, CONFIG.COLS.STATUS);
  if (statusHeaderCell.getValue() !== "Email Status") {
    statusHeaderCell.setValue("Email Status");
  }

  // 2. Get all data (from Row 2 to Last Row)
  // We grab columns 1 to 9 (A to I) to have all data available
  const dataRange = sheet.getRange(2, 1, lastRow - 1, CONFIG.COLS.STATUS);
  const data = dataRange.getValues();
  
  // 3. Loop through every row
  data.forEach((row, index) => {
    const realRowIndex = index + 2; // Rows are 1-indexed, and we started at row 2
    
    const name = row[CONFIG.COLS.NAME - 1];
    const email = row[CONFIG.COLS.EMAIL - 1];
    const events = row[CONFIG.COLS.EVENTS - 1];
    const status = row[CONFIG.COLS.STATUS - 1];
    
    // Condition: Email exists + Name exists + Status is NOT "SENT"
    if (email && name && status !== "SENT") {
      try {
        sendEmail(email, name, events);
        
        // Mark as SENT so we don't send again
        sheet.getRange(realRowIndex, CONFIG.COLS.STATUS).setValue("SENT");
        console.log(`Email sent to: ${email}`);
        
      } catch (error) {
        console.error(`Failed to send to ${email}: ${error.toString()}`);
        sheet.getRange(realRowIndex, CONFIG.COLS.STATUS).setValue("ERROR");
      }
    }
  });
}

/**
 * HELPER: Send the actual email
 */
function sendEmail(toEmail, name, events) {
  // 1. Send Confirmation to Student
  const htmlBody = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
      
      <!-- Header -->
      <div style="background: #000; color: #fbbf24; padding: 30px 20px; text-align: center;">
        <h1 style="margin:0; font-size: 28px; letter-spacing: 1px;">⚡ BlitzKrieg 2K26</h1>
        <p style="margin: 5px 0 0 0; color: #fff; opacity: 0.9;">Registration Confirmed</p>
      </div>

      <!-- Main Content -->
      <div style="padding: 30px; background: #fff;">
        <p style="font-size: 16px; color: #333; margin-top: 0;">Hi <strong>${name}</strong>,</p>
        <p style="color: #4b5563; line-height: 1.5;">Registration successful! We are thrilled to have you join us for the symposium.</p>
        
        <!-- Events Box -->
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #fbbf24; margin: 25px 0;">
          <strong style="display: block; margin-bottom: 5px; color: #000;">Registered Events:</strong>
          <span style="color: #4b5563;">${events || "General Entry"}</span>
        </div>

        <!-- Details Grid -->
        <div style="background: #111; color: #fbbf24; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
          <p style="margin: 5px 0;"><strong>📅 Date:</strong> 9 February 2026</p>
          <p style="margin: 5px 0;"><strong>🏢 College:</strong> R.M.K. Engineering College</p>
          <p style="margin: 5px 0;"><strong>📍 Venue:</strong> PV Block</p>
          <p style="margin: 5px 0;"><strong>⏰ Time:</strong> 9:00 AM</p>
        </div>

        <!-- Instructions -->
        <div style="padding: 10px 0; border-top: 1px solid #e5e7eb;">
          <h3 style="margin-bottom: 15px; color: #000;">✨ Important Instructions</h3>
          <ul style="color: #4b5563; padding-left: 20px; line-height: 1.6;">
            <li>Please carry a valid <strong>Student ID Card</strong>.</li>
            <li>Arrive at least <strong>30 minutes early</strong>.</li>
            <li>Lunch will be provided at the venue. 🍱</li>
          </ul>
        </div>

        <p style="color: #4b5563; margin-top: 25px; line-height: 1.5;">
          If you have any queries, feel free to reach out to us.<br/>
          We look forward to seeing you!
        </p>

        <p style="margin-top: 30px; font-weight: bold; color: #000;">
          Regards,<br/>
          BlitzKrieg Team
        </p>
      </div>

      <!-- Footer -->
      <div style="background: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #9ca3af;">
        <p style="margin: 0;">This is an automated confirmation message.</p>
      </div>
    </div>
  `;

  GmailApp.sendEmail(toEmail, CONFIG.EMAIL_SUBJECT, "Please enable HTML email to view this message.", {
    htmlBody: htmlBody,
    name: CONFIG.SENDER_NAME
  });

  // 2. Send Notification to Admin (Replaces the "Bot" logic)
  const adminEmail = "blitzkrieg.2k26@gmail.com";
  const adminSubject = `🔔 New Registration: ${name}`;
  const adminBody = `
    New Student Registered!
    
    Name: ${name}
    Email: ${toEmail}
    Events: ${events}
    
    (Sent via Apps Script Automation)
  `;
  
  GmailApp.sendEmail(adminEmail, adminSubject, adminBody);
}
```

## 💾 Step 3: Save & Test

1.  Click the 💾 **Save** icon (disk) in the toolbar. Name it "Email Automation".
2.  **Run it once manually** to authorize permissions:
    *   Select `processRegistrations` from the dropdown menu in the toolbar.
    *   Click **Run**.
    *   Grant permissions (Select Account > Advanced > Go to (unsafe) > Allow).
    *   *Note: It is "unsafe" only because you haven't published it to the world. It is safe for you.*
3.  Check your Sheet: Column I should now say "SENT" for any existing rows.
4.  Check your Gmail Sent folder.

## ⏰ Step 4: Automate (The Important Part)

Since your website adds rows via API, we need the script to check the sheet automatically.

1.  In the left sidebar, click **Triggers** (alarm clock icon).
2.  Click **+ Add Trigger** (blue button, bottom right).
3.  Settings:
    *   **Function to run**: `processRegistrations`
    *   **Deployment**: `Head`
    *   **Event source**: `Time-driven`
    *   **Type of time based trigger**: `Minutes timer`
    *   **Interval**: `Every minute`
4.  Click **Save**.

## ✅ Done!

Now, whenever someone registers on your website:
1.  The website adds a row to the Sheet.
2.  Within 1 minute, this script runs.
3.  It sees the new row (Status is empty).
4.  It sends the email.
5.  It marks the row as "SENT".
