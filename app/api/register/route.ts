import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import { getEvents } from '@/lib/events'
import { Resend } from 'resend'
import { addRegistrationToSheet } from '@/lib/googleSheets'

// Initialize Resend only if API key is available
const resendApiKey = process.env.RESEND_API_KEY
const resend = resendApiKey ? new Resend(resendApiKey) : null

interface RegistrationData {
  name: string
  email: string
  phone: string
  college: string
  department: string
  yearOfStudy: string
  selectedEvents: string[]
}

function formatEventNames(eventIds: string[]): string {
  const events = getEvents()
  return eventIds
    .map(id => {
      const event = events.find(e => e.id === id)
      return event ? event.name : id
    })
    .join(', ')
}

async function sendUserConfirmationEmail(data: RegistrationData) {
  if (!resend) {
    console.warn('Resend API key not configured. Skipping email sending.')
    return
  }

  const eventNames = formatEventNames(data.selectedEvents)
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  try {
    await resend.emails.send({
      from: 'Symposium <noreply@yourdomain.com>',
      to: data.email,
      subject: 'Registration Confirmation - Technical Symposium 2024',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #000; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .detail { margin: 15px 0; padding: 10px; background: white; border-left: 4px solid #fbbf24; }
              .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Registration Confirmed!</h1>
              </div>
              <div class="content">
                <p>Dear ${data.name},</p>
                <p>Thank you for registering for the Technical Symposium 2024!</p>
                <h2>Registration Details:</h2>
                <div class="detail"><strong>Name:</strong> ${data.name}</div>
                <div class="detail"><strong>Email:</strong> ${data.email}</div>
                <div class="detail"><strong>Phone:</strong> ${data.phone}</div>
                <div class="detail"><strong>College:</strong> ${data.college}</div>
                <div class="detail"><strong>Department:</strong> ${data.department}</div>
                <div class="detail"><strong>Year of Study:</strong> ${data.yearOfStudy}</div>
                <div class="detail"><strong>Selected Events:</strong> ${eventNames}</div>
                <div class="detail"><strong>Registration Date & Time:</strong> ${new Date().toLocaleString()}</div>
                <p style="margin-top: 20px;">We look forward to seeing you at the symposium!</p>
                <p>For any queries, please contact the organizing committee.</p>
              </div>
              <div class="footer">
                <p>Technical Symposium 2024 | <a href="${appUrl}">Visit Website</a></p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
        Registration Confirmed!

        Dear ${data.name},

        Thank you for registering for the Technical Symposium 2024!

        Registration Details:
        Name: ${data.name}
        Email: ${data.email}
        Phone: ${data.phone}
        College: ${data.college}
        Department: ${data.department}
        Year of Study: ${data.yearOfStudy}
        Selected Events: ${eventNames}
        Registration Date & Time: ${new Date().toLocaleString()}

        We look forward to seeing you at the symposium!

        For any queries, please contact the organizing committee.

        Technical Symposium 2024
      `,
    })
  } catch (error) {
    console.error('Error sending user confirmation email:', error)
    // Don't fail the registration if email fails
  }
}

async function sendOrganizerNotification(data: RegistrationData) {
  if (!resend) {
    console.warn('Resend API key not configured. Skipping email sending.')
    return
  }

  const organizerEmail = process.env.ORGANIZER_EMAIL
  if (!organizerEmail) {
    console.warn('ORGANIZER_EMAIL not configured')
    return
  }

  const eventNames = formatEventNames(data.selectedEvents)

  try {
    await resend.emails.send({
      from: 'Symposium <noreply@yourdomain.com>',
      to: organizerEmail,
      subject: `New Registration: ${data.name} - Technical Symposium 2024`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #1f2937; color: #fbbf24; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .detail { margin: 10px 0; padding: 10px; background: white; border-left: 4px solid #1f2937; }
              table { width: 100%; border-collapse: collapse; margin: 20px 0; }
              table td { padding: 8px; border-bottom: 1px solid #ddd; }
              table td:first-child { font-weight: bold; width: 40%; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>New Registration Received</h1>
              </div>
              <div class="content">
                <h2>Registration Details:</h2>
                <table>
                  <tr><td>Name</td><td>${data.name}</td></tr>
                  <tr><td>Email</td><td>${data.email}</td></tr>
                  <tr><td>Phone</td><td>${data.phone}</td></tr>
                  <tr><td>College</td><td>${data.college}</td></tr>
                  <tr><td>Department</td><td>${data.department}</td></tr>
                  <tr><td>Year of Study</td><td>${data.yearOfStudy}</td></tr>
                  <tr><td>Selected Events</td><td>${eventNames}</td></tr>
                  <tr><td>Registration Date & Time</td><td>${new Date().toLocaleString()}</td></tr>
                </table>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
        New Registration Received

        Registration Details:
        Name: ${data.name}
        Email: ${data.email}
        Phone: ${data.phone}
        College: ${data.college}
        Department: ${data.department}
        Year of Study: ${data.yearOfStudy}
        Selected Events: ${eventNames}
        Registration Date & Time: ${new Date().toLocaleString()}
      `,
    })
  } catch (error) {
    console.error('Error sending organizer notification:', error)
    // Don't fail the registration if email fails
  }
}

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
      console.error('Google Sheets error:', error)
    })

    // Send emails asynchronously (don't wait for them to complete)
    Promise.all([
      sendUserConfirmationEmail(data),
      sendOrganizerNotification(data),
    ]).catch(error => {
      console.error('Email sending error:', error)
    })

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
