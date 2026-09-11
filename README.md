# NoteHub

NoteHub is a note management application built with Next.js App Router and
TypeScript.

## Features

- View, search, create, and delete notes
- Filter notes by tag using catch-all routes
- Tag navigation with parallel routes
- Note preview modal with intercepted routes
- Direct note details page
- Server-side data prefetching and hydration with TanStack Query
- Loading, error, and not-found states

## Technologies

- Next.js
- React
- TypeScript
- TanStack Query
- Axios
- Formik
- Yup
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
