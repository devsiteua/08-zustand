'use client';

import { useState } from 'react';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';

import { createNote, deleteNote, fetchNotes } from '@/lib/api/notes';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';

import css from '../../NotesPage.module.css';

const PER_PAGE = 12;

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['notes'] });
      setIsModalOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleOpenModal = () => {
    createMutation.reset();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    createMutation.reset();
    setIsModalOpen(false);
  };

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 300);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['notes', currentPage, searchQuery, tag],
    queryFn: () =>
      fetchNotes({
        page: currentPage,
        perPage: PER_PAGE,
        search: searchQuery,
        tag,
      }),
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleSearch} />

        {!isError && data && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}

        <button className={css.button} type="button" onClick={handleOpenModal}>
          Create note +
        </button>
      </header>

      {deleteMutation.isError && (
        <p>Failed to delete note: {deleteMutation.error.message}</p>
      )}

      {isLoading && <p>Loading notes...</p>}

      {isError && <p>Failed to load notes: {error.message}</p>}

      {!isLoading && !isError && data && data.notes.length === 0 && (
        <p>No notes found.</p>
      )}

      {!isError && data && data.notes.length > 0 && (
        <NoteList
          notes={data.notes}
          onDelete={noteId => deleteMutation.mutate(noteId)}
          deletingNoteId={
            deleteMutation.isPending ? deleteMutation.variables : undefined
          }
        />
      )}

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          {createMutation.isError && (
            <p>Failed to create note: {createMutation.error.message}</p>
          )}

          <NoteForm
            onSubmit={note => createMutation.mutate(note)}
            onCancel={handleCloseModal}
            isSubmitting={createMutation.isPending}
          />
        </Modal>
      )}
    </div>
  );
}
