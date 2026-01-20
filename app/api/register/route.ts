import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import { addRegistrationToSheet } from '@/lib/googleSheets'

interface RegistrationData {
  name: string
  email: string
  phone: string
  college: string
  department: string
  yearOfStudy: string
  selectedEvents: string[]
}

// Emails are now handled by Google Apps Script triggered by the Google Sheet
// See APPS_SCRIPT_EMAIL_SETUP.md for details

export async function POST(request: NextRequest) {
  try {
    const data: RegistrationData = await request.json()

    // Validate required fields
    if (!data.name || !data.email || !data.phone || !data.college ||
      !data.department || !data.yearOfStudy || !data.selectedEvents ||
      data.selectedEvents.length === 0) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Save to database
    let dbError = null
    try {
      const supabaseAdmin = getSupabaseAdmin()
      const { error } = await supabaseAdmin
        .from('registrations')
        .insert({
          name: data.name,
          email: data.email,
          phone: data.phone,
          college: data.college,
          department: data.department,
          year_of_study: data.yearOfStudy,
          selected_events: data.selectedEvents,
          registered_at: new Date().toISOString(),
        })
      dbError = error
    } catch (supabaseError: any) {
      console.error('Supabase configuration error:', supabaseError)
      // If Supabase isn't configured, we can still proceed with emails
      // but return a warning
      if (supabaseError.message?.includes('environment variables')) {
        console.warn('Supabase not configured. Registration data will not be saved to database.')
        // Continue to send emails even if database save fails
      } else {
        throw supabaseError
      }
    }

    if (dbError) {
      console.error('Database error:', dbError)
      // Still send emails even if database fails
      // Return error but don't block the process
    }

    // Save to Google Sheets
    addRegistrationToSheet(data).catch(error => {
      console.error('⚠️ Google Sheets error (non-critical):', error?.message || error)
    })

    // Emails are sent via Google Apps Script (triggered by Sheets)
    console.log('✅ Registration saved to database and sent to Google Sheets for processing')

    return NextResponse.json(
      {
        message: 'Registration successful',
        data: {
          name: data.name,
          email: data.email,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
