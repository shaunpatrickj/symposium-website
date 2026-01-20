import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function testSheetConnection() {
    console.log('Testing Google Sheets connection...');
    console.log(' Spreadsheet ID:', process.env.GOOGLE_SHEETS_SPREADSHEET_ID);
    console.log(' Service Account:', process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);

    if (!process.env.GOOGLE_PRIVATE_KEY) {
        console.error('❌ GOOGLE_PRIVATE_KEY is missing');
        return;
    }

    const testData = {
        name: "Test User",
        email: "test@example.com",
        phone: "1234567890",
        college: "Test College",
        department: "Test Dept",
        yearOfStudy: "3rd Year",
        selectedEvents: ["paper-presentation"]
    };

    try {
        await addRegistrationToSheet(testData);
        console.log('✅ Success! Test row added to sheet.');
    } catch (error) {
        console.error('❌ Failed:', error);
    }
}

testSheetConnection();
