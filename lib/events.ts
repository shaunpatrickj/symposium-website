import eventsData from '@/data/events.json'

export interface Event {
  id: string
  name: string
  slug: string
  description: string
  longDescription: string
  rules: string[]
  prize: string
}

export function getEvents(): Event[] {
  return eventsData.events
}

export function getEventBySlug(slug: string): Event | undefined {
  return eventsData.events.find(event => event.slug === slug)
}

export function getEventById(id: string): Event | undefined {
  return eventsData.events.find(event => event.id === id)
}

export function getEventSlugs(): string[] {
  return eventsData.events.map(event => event.slug)
}
