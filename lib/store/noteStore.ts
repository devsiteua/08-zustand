import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { NewNote } from '@/types/note';

const initialDraft: NewNote = {
  title: '',
  content: '',
  tag: 'Todo',
};

type NoteStore = {
  draft: NewNote;
  setDraft: (draft: NewNote) => void;
  clearDraft: () => void;
};

export const useNoteStore = create<NoteStore>()(
  persist(
    set => ({
      draft: initialDraft,

      setDraft: draft => set({ draft }),

      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft',
      partialize: state => ({ draft: state.draft }),
    }
  )
);
