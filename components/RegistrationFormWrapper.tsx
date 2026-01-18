'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import RegistrationForm from '@/components/RegistrationForm'
import { getEvents } from '@/lib/events'

export default function RegistrationFormWrapper() {
  const searchParams = useSearchParams()
  const eventParam = searchParams.get('event')
  const [preSelectedEvent, setPreSelectedEvent] = useState<string | null>(null)

  useEffect(() => {
    if (eventParam) {
      setPreSelectedEvent(eventParam)
    }
  }, [eventParam])

  const events = getEvents()
  const eventOptions = events.map(event => ({
    id: event.id,
    name: event.name,
  }))

  return (
    <RegistrationForm 
      events={eventOptions} 
      preSelectedEvent={preSelectedEvent}
    />
  )
}
