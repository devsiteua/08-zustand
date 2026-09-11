import css from '../NotesPage.module.css';

export default function Loading() {
  return (
    <div className={css.app}>
      <p>Loading notes, please wait...</p>
    </div>
  );
}
