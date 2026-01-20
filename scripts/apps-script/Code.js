/**
 * Google Apps Script - Email Automation
 * -------------------------------------
 * Copy and paste this code into your Google Sheet's Script Editor.
 * (Extensions > Apps Script)
 * 
 * Follow the setup guide in APPS_SCRIPT_EMAIL_SETUP.md
 */

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
    // Customize your email HTML here
    const htmlBody = `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
      <div style="background: #000; color: #fbbf24; padding: 20px; text-align: center;">
        <h1 style="margin:0;">BlitzKrieg 2K26</h1>
      </div>
      <div style="padding: 20px;">
        <p>Hi <strong>${name}</strong>,</p>
        <p>Thanks for registering! We've received your details.</p>
        
        <div style="background: #f3f4f6; padding: 15px; border-left: 5px solid #fbbf24; margin: 20px 0;">
          <strong>Events Registered:</strong><br/>
          ${events || "General Entry"}
        </div>

        <p><strong>Venue:</strong> R.M.K. Engineering College<br/>
           <strong>Date:</strong> Feb 9, 2026</p>
        
        <p>See you there!</p>
        <hr style="border:0; border-top:1px solid #eee; margin: 20px 0;">
        <small style="color: #666;">This is an automated message.</small>
      </div>
    </div>
  `;

    GmailApp.sendEmail(toEmail, CONFIG.EMAIL_SUBJECT, "Please enable HTML email to view this message.", {
        htmlBody: htmlBody,
        name: CONFIG.SENDER_NAME
    });
}
