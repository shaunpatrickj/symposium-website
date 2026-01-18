import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import { getEvents } from '@/lib/events'

// This endpoint exports registrations as CSV
// In production, you should add authentication/authorization
export async function GET(request: NextRequest) {
  try {
    const supabaseAdmin = getSupabaseAdmin()
    const { data, error } = await supabaseAdmin
      .from('registrations')
      .select('*')
      .order('registered_at', { ascending: false })

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch registrations' },
        { status: 500 }
      )
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'No registrations found' }, { status: 404 })
    }

    const events = getEvents()
    function formatEventNames(eventIds: string[]): string {
      return eventIds
        .map(id => {
          const event = events.find(e => e.id === id)
          return event ? event.name : id
        })
        .join('; ')
    }

    // Convert to CSV
    const headers = [
      'Name',
      'Email',
      'Phone',
      'College',
      'Department',
      'Year of Study',
      'Selected Events',
      'Registration Date & Time',
    ]

    const csvRows = [
      headers.join(','),
      ...data.map((reg: any) => [
        `"${reg.name.replace(/"/g, '""')}"`,
        `"${reg.email.replace(/"/g, '""')}"`,
        `"${reg.phone.replace(/"/g, '""')}"`,
        `"${reg.college.replace(/"/g, '""')}"`,
        `"${reg.department.replace(/"/g, '""')}"`,
        `"${reg.year_of_study.replace(/"/g, '""')}"`,
        `"${formatEventNames(reg.selected_events).replace(/"/g, '""')}"`,
        `"${new Date(reg.registered_at).toLocaleString().replace(/"/g, '""')}"`,
      ].join(',')),
    ]

    const csv = csvRows.join('\n')

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="symposium-registrations-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    })
  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json(
      { error: 'An error occurred while exporting data' },
      { status: 500 }
    )
  }
}
