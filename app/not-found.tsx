import type { Metadata } from 'next';
import css from './page.module.css';

export const metadata: Metadata = {
  title: 'Page Not Found | NoteHub',
  description: 'The requested page could not be found in NoteHub.',
  openGraph: {
    title: 'Page Not Found | NoteHub',
    description: 'The requested page could not be found in NoteHub.',
    url: '/404',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      },
    ],
  },
};

export default function NotFound() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>404 - Page not found</h1>
        <p className={css.description}>
          Sorry, the page you are looking for does not exist.
        </p>
      </div>
    </main>
  );
}
