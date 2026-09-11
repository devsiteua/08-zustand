import axios from 'axios';
import type { NewNote, Note } from '@/types/note';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
}

const notehubApi = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export async function fetchNotes({
  page,
  perPage,
  search,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const response = await notehubApi.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      perPage,
      search,
      tag,
    },
  });

  return response.data;
}

export async function createNote(note: NewNote): Promise<Note> {
  const response = await notehubApi.post<Note>('/notes', note);

  return response.data;
}

export async function deleteNote(noteId: string): Promise<Note> {
  const response = await notehubApi.delete<Note>(`/notes/${noteId}`);

  return response.data;
}

export async function fetchNoteById(noteId: string): Promise<Note> {
  const response = await notehubApi.get<Note>(`/notes/${noteId}`);
  return response.data;
}
