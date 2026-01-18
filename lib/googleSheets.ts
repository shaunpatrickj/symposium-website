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
      console.warn('Google Sheets not configured. Missing environment variables.')
      return
    }

    // Initialize Google Auth
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: serviceAccountEmail,
        private_key: privateKey.replace(/\\n/g, '\n'),
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

    console.log('Registration added to Google Sheet successfully')
  } catch (error: any) {
    console.error('Error adding to Google Sheet:', error)
    // Don't throw - we don't want to fail registration if sheet fails
    if (error.message) {
      console.error('Error details:', error.message)
    }
  }
}
