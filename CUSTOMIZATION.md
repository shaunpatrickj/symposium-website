# Customization Guide

This guide provides detailed instructions for customizing various aspects of the symposium website.

## 🎨 Changing Colors and Theme

### Primary Accent Color (Gold)

**Option 1: Using Tailwind Config** (Recommended)

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      gold: {
        50: '#fffbeb',   // Lightest
        100: '#fef3c7',
        200: '#fde68a',
        300: '#fcd34d',
        400: '#fbbf24',  // Default
        500: '#f59e0b',  // Primary
        600: '#d97706',
        700: '#b45309',
        800: '#92400e',
        900: '#78350f',  // Darkest
      },
    },
  },
}
```

**Option 2: Using CSS Variables**

Edit `app/globals.css`:

```css
:root {
  --gold: #your-color;
  --gold-dark: #darker-shade;
  --bg-dark: #0a0a0a;
}
```

### Background Colors

Edit `app/globals.css`:

```css
:root {
  --bg-dark: #0a0a0a;      /* Main background */
  --bg-darker: #050505;    /* Darker sections */
}
```

### Component-Specific Colors

- **Navbar**: `components/Navbar.tsx` - Look for `bg-black/80`, `border-gold-500`
- **Buttons**: Search for `bg-gold-500` and `hover:bg-gold-400`
- **Borders**: Search for `border-gold-500`

## 📝 Changing Events

### Adding a New Event

1. **Edit `data/events.json`**:

```json
{
  "events": [
    {
      "id": "new-event-id",
      "name": "New Event Name",
      "slug": "new-event",
      "description": "Brief description shown on cards",
      "longDescription": "Detailed description shown on event page",
      "rules": [
        "Rule 1",
        "Rule 2",
        "Rule 3"
      ],
      "prize": "Prize information"
    }
  ]
}
```

2. **The registration form automatically includes all events from the JSON file**

The `RegistrationForm` component reads from `events.json`, so new events will automatically appear in the checkbox list.

### Modifying Existing Events

Simply edit the event object in `data/events.json`. Changes will reflect immediately.

### Event ID vs Slug

- **`id`**: Used internally (must be unique, lowercase, hyphenated)
- **`slug`**: Used in URLs (e.g., `/events/paper-presentation`)

Keep these consistent and URL-friendly (lowercase, hyphens only).

## 📧 Changing Organizer Email

### During Development

Edit `.env.local`:

```env
ORGANIZER_EMAIL=new-email@example.com
```

### In Production

Set the environment variable in your hosting platform (Vercel/Netlify).

### Multiple Organizers

To send to multiple organizers, modify `app/api/register/route.ts`:

```typescript
// Single email
to: organizerEmail

// Multiple emails
to: ['email1@example.com', 'email2@example.com']
```

## 📋 Modifying Registration Form

### Adding a New Field

1. **Update the FormData interface** in `components/RegistrationForm.tsx`:

```typescript
interface FormData {
  // ... existing fields
  newField: string
}
```

2. **Add the input field** in the form JSX:

```tsx
<div className="mb-6">
  <label htmlFor="newField" className="block text-white font-semibold mb-2">
    New Field <span className="text-red-400">*</span>
  </label>
  <input
    type="text"
    id="newField"
    name="newField"
    value={formData.newField}
    onChange={handleChange}
    className="w-full px-4 py-3 bg-black/50 border-2 rounded-lg text-white focus:outline-none focus:border-gold-500 transition-all border-gold-500/30"
    placeholder="Enter value"
  />
</div>
```

3. **Add validation** in the `validate()` function:

```typescript
if (!formData.newField.trim()) {
  newErrors.newField = 'Please enter a value'
}
```

4. **Update the database schema**:

Run this SQL in Supabase:

```sql
ALTER TABLE registrations ADD COLUMN new_field TEXT;
```

5. **Update the API route** (`app/api/register/route.ts`):

```typescript
await supabaseAdmin.from('registrations').insert({
  // ... existing fields
  new_field: data.newField,
})
```

6. **Update email templates** to include the new field

### Removing a Field

1. Remove from `FormData` interface
2. Remove the input field from JSX
3. Remove validation
4. Remove from API route insert statement
5. Update emails if needed

### Changing Field Order

Simply reorder the input fields in `components/RegistrationForm.tsx`. The order in the JSX determines the display order.

### Making a Field Optional

Remove it from the validation function, or make it conditional:

```typescript
// Optional field (only validate if filled)
if (formData.optionalField && formData.optionalField.length < 3) {
  newErrors.optionalField = 'Must be at least 3 characters'
}
```

## ✉️ Customizing Email Templates

Edit `app/api/register/route.ts`:

### User Confirmation Email

Find `sendUserConfirmationEmail()` and modify the HTML:

```typescript
html: `
  <div>
    <h1>Your Custom Header</h1>
    <p>Custom content here</p>
    <!-- Add your branding, logo, etc. -->
  </div>
`
```

### Organizer Notification Email

Find `sendOrganizerNotification()` and customize similarly.

### Adding Images/Logos

```html
<img src="https://yoursite.com/logo.png" alt="Logo" />
```

Or use base64-encoded images for embedded logos.

### Changing Email Styles

Modify the inline CSS in the `<style>` tag within the HTML strings.

## 🏠 Customizing Homepage

Edit `app/page.tsx`:

- **Hero Section**: Modify the heading, description, and buttons
- **About Section**: Update the symposium description
- **Event Cards**: Customize via `components/EventCard.tsx`

## 🧭 Customizing Navigation

Edit `components/Navbar.tsx`:

- Change logo text
- Add/remove menu items
- Modify styling

## 🦶 Customizing Footer

Edit `components/Footer.tsx`:

- Update contact information
- Add social media links
- Modify layout

## 🔤 Changing Fonts

Edit `app/globals.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@400;600;700&display=swap');

:root {
  font-family: 'YourFont', sans-serif;
}
```

Update `tailwind.config.js`:

```javascript
fontFamily: {
  serif: ['YourFont', 'serif'],
  display: ['YourDisplayFont', 'serif'],
}
```

## 📱 Mobile Responsiveness

The website is already responsive, but you can customize breakpoints in `tailwind.config.js`:

```javascript
theme: {
  screens: {
    'sm': '640px',
    'md': '768px',
    'lg': '1024px',
    'xl': '1280px',
  },
}
```

## 🎯 Advanced Customizations

### Adding Authentication

To protect the export endpoint or admin features:

1. Install NextAuth.js: `npm install next-auth`
2. Set up authentication providers
3. Add middleware to protect routes

### Adding Analytics

Add Google Analytics or similar:

1. Create a component for the tracking script
2. Add to `app/layout.tsx`

### Adding SEO

Update `app/layout.tsx` metadata:

```typescript
export const metadata: Metadata = {
  title: 'Your Title',
  description: 'Your description',
  openGraph: {
    title: 'Your Title',
    description: 'Your description',
    images: ['/og-image.jpg'],
  },
}
```

## 🧪 Testing Changes

1. **Development**: `npm run dev` - Test locally
2. **Production Build**: `npm run build` - Check for errors
3. **Linting**: `npm run lint` - Fix code issues

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
