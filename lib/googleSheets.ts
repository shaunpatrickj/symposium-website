import { google } from 'googleapis'
import { getEvents } from './events'

interface RegistrationData {
  name: string
  email: string
  phone: string
  college: string
  department: string
  yearOfStudy: string
  selectedEvents: string[]
}

export async function addRegistrationToSheet(data: RegistrationData) {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
    const privateKey = process.env.GOOGLE_PRIVATE_KEY

    if (!spreadsheetId || !serviceAccountEmail || !privateKey) {
      console.log('ℹ️ Google Sheets not configured. Skipping (optional feature).')
      return
    }

    // Initialize Google Auth
    let formattedPrivateKey = privateKey.replace(/\\n/g, '\n')
    
    // Remove quotes if they exist at the beginning and end
    if (formattedPrivateKey.startsWith('"') && formattedPrivateKey.endsWith('"')) {
      formattedPrivateKey = formattedPrivateKey.slice(1, -1)
    }
    
    // Ensure the private key starts and ends correctly
    if (!formattedPrivateKey.includes('BEGIN PRIVATE KEY')) {
      console.error('❌ Google Sheets: Invalid private key format (missing BEGIN PRIVATE KEY)')
      return
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: serviceAccountEmail,
        private_key: formattedPrivateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })

    // Format event names
    const events = getEvents()
    const eventNames = data.selectedEvents
      .map(id => {
        const event = events.find(e => e.id === id)
        return event ? event.name : id
      })
      .join(', ')

    const timestamp = new Date().toLocaleString()

    // Prepare row data - matches column order in sheet
    const rowData = [
      timestamp,           // A: Registration Date & Time
      data.name,          // B: Name
      data.email,         // C: Email
      data.phone,         // D: Phone
      data.college,       // E: College
      data.department,    // F: Department
      data.yearOfStudy,   // G: Year of Study
      eventNames,         // H: Selected Events
    ]

    // Append row to the sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:H', // Adjust range if using different sheet name
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [rowData],
      },
    })

    console.log('✅ Registration added to Google Sheet successfully')
  } catch (error: any) {
    console.error('⚠️ Google Sheets error (non-critical - registration still successful):')
    if (error.message) {
      console.error('Error message:', error.message)
    }
    if (error.code) {
      console.error('Error code:', error.code)
    }
    // Don't throw - we don't want to fail registration if sheet fails
    console.log('ℹ️ Tip: Google Sheets is optional. Remove Google Sheets variables from .env.local to disable.')
  }
}
