const { google } = require('googleapis');

async function testConnection() {
    console.log('Testing Google Sheets connection (Vanilla JS)...');

    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;

    if (!spreadsheetId || !serviceAccountEmail || !privateKey) {
        console.error('❌ Missing environment variables');
        return;
    }

    // --- LOGIC FROM lib/googleSheets.ts ---
    // Initialize Google Auth
    let formattedPrivateKey = privateKey;

    // 1. Unescape escaped newlines (common in .env files)
    formattedPrivateKey = formattedPrivateKey.replace(/\\n/g, '\n');

    // 2. Strip surrounding quotes if present
    if (formattedPrivateKey.startsWith('"') && formattedPrivateKey.endsWith('"')) {
        formattedPrivateKey = formattedPrivateKey.slice(1, -1);
    }

    // 3. Trim extra whitespace
    formattedPrivateKey = formattedPrivateKey.trim();

    // 4. Ensure proper PEM headers
    if (!formattedPrivateKey.includes('BEGIN PRIVATE KEY')) {
        console.error('❌ Google Sheets: Invalid private key format (missing BEGIN PRIVATE KEY)');
        return;
    }
    // --------------------------------------

    try {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: serviceAccountEmail,
                private_key: formattedPrivateKey,
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const sheets = google.sheets({ version: 'v4', auth });

        // Try to append a dummy row
        const rowData = [
            new Date().toLocaleString(),
            "Verify Script",
            "verify@example.com",
            "0000000000",
            "Verification College",
            "Dev",
            "N/A",
            "OSSL Fix Check"
        ];

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: 'Sheet1!A:H',
            valueInputOption: 'USER_ENTERED',
            insertDataOption: 'INSERT_ROWS',
            requestBody: {
                values: [rowData],
            },
        });

        console.log('✅ Success! Verification row added to sheet.');
    } catch (error) {
        console.error('❌ Failed:', error.message);
        if (error.code) console.error('Code:', error.code);
    }
}

testConnection();
