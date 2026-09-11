# NoteHub

NoteHub is a note management application built with Next.js App Router and
TypeScript.

## Features

- View, search, create, and delete notes
- Filter notes by tag using catch-all routes
- Tag navigation with parallel routes
- Note preview modal with intercepted routes
- Direct note details page
- Dedicated page for creating notes
- Draft state management and persistence with Zustand
- Server-side data prefetching and hydration with TanStack Query
- Dynamic SEO metadata and Open Graph
- Loading, error, and not-found states

## Technologies

- Next.js
- React
- TypeScript
- TanStack Query
- Zustand
- Axios
- CSS Modules

## Getting Started

Install dependencies:

```bash
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_NOTEHUB_TOKEN=your_token
```

Run the development server:

```bash
npm run dev
```
