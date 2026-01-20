/**
 * @deprecated This file is no longer used for sending registration emails.
 * Emails are now handled by Google Apps Script triggered by Google Sheets.
 * See: APPS_SCRIPT_EMAIL_SETUP.md
 */

import nodemailer from 'nodemailer'

// Create Nodemailer transporter
function createTransporter() {
  const smtpHost = process.env.SMTP_HOST
  const smtpPort = parseInt(process.env.SMTP_PORT || '587')
  const smtpUser = process.env.SMTP_USER
  const smtpPassword = process.env.SMTP_PASSWORD
  const smtpSecure = process.env.SMTP_SECURE === 'true'

  if (!smtpHost || !smtpUser || !smtpPassword) {
    console.warn('⚠️ SMTP configuration missing. Check your .env.local file.')
    return null
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
      // For Gmail: Enable less secure apps or use App Password
      // For other providers: Check their SMTP settings
    })

    return transporter
  } catch (error) {
    console.error('❌ Error creating email transporter:', error)
    return null
  }
}

export async function sendEmail(options: {
  to: string
  subject: string
  html: string
  text: string
  from?: string
}) {
  console.warn('⚠️ DEPRECATED: sendEmail() called. Emails should be handled by Google Sheets.')

  const transporter = createTransporter()

  if (!transporter) {
    console.warn('❌ Email transporter not available. Skipping email sending.')
    return { success: false, error: 'Email transporter not configured' }
  }

  // Get "from" address from env or use default
  const fromEmail = options.from || process.env.SMTP_FROM || process.env.SMTP_USER || 'noreply@example.com'
  const fromName = process.env.SMTP_FROM_NAME || 'Symposium'

  try {
    console.log(`📧 Attempting to send email to: ${options.to}`)

    const info = await transporter.sendMail({
      from: `${fromName} <${fromEmail}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    })

    console.log('✅ Email sent successfully!')
    console.log('Message ID:', info.messageId)
    console.log('Sent to:', options.to)
    console.log('Response:', info.response)

    return { success: true, messageId: info.messageId }
  } catch (error: any) {
    console.error('❌ Error sending email:', error)
    console.error('Error message:', error.message)
    console.error('Error code:', error.code)

    return { success: false, error: error.message || 'Unknown error' }
  }
}

// Verify transporter configuration
export async function verifyEmailConfig() {
  const transporter = createTransporter()

  if (!transporter) {
    return { valid: false, message: 'Email transporter not configured' }
  }

  try {
    await transporter.verify()
    console.log('✅ Email server configuration is valid')
    return { valid: true, message: 'Email server ready' }
  } catch (error: any) {
    console.error('❌ Email server configuration invalid:', error)
    return { valid: false, message: error.message || 'Invalid configuration' }
  }
}
