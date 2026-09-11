import Modal from '@/components/Modal/Modal';
import { fetchNoteById } from '@/lib/api/notes';

import NotePreviewClient from './NotePreview.client';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NotePreviewPage({ params }: Props) {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return (
    <Modal>
      <NotePreviewClient note={note} />
    </Modal>
  );
}
