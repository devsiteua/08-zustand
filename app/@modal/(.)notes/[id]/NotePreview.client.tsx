'use client';

import { useRouter } from 'next/navigation';

import type { Note } from '@/types/note';

import css from './NotePreview.module.css';

interface NotePreviewProps {
  note: Note;
}

export default function NotePreviewClient({ note }: NotePreviewProps) {
  const router = useRouter();

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>

        <p className={css.tag}>{note.tag}</p>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{note.createdAt}</p>

        <button
          type="button"
          className={css.backBtn}
          onClick={() => router.back()}
        >
          Back
        </button>
      </div>
    </div>
  );
}
