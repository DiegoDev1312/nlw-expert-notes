import { ChangeEvent, useState } from 'react';
import logo from './assets/mini-logo-nlw-expert.svg';
import { NewNoteCard } from './components/new-note-card';
import { NoteCard } from './components/note-card';
import { ISOStringFormat } from 'date-fns';

export interface NoteProps {
  id: string;
  content: string;
  date: ISOStringFormat;
}

export function App() {
  const [notes, setNotes] = useState<NoteProps[]>(() => {
    const notesOnStorage = localStorage.getItem('notes');

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage);
    }

    return [];
  });
  const [search, setSearch] = useState('');

  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date().toISOString() as ISOStringFormat,
      content,
    };
    const notesArray = [newNote, ...notes];

    setNotes(notesArray);
    localStorage.setItem('notes', JSON.stringify(notesArray));
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;
    setSearch(query);
  }

  
  function onNoteDeleted(id: string) {
    const newNotes = notes.filter((note) => note.id !== id);

    setNotes(newNotes);
    localStorage.setItem('notes', JSON.stringify(newNotes));
  }

  const filteredNotes = search ? notes.filter((note) => note.content.toLowerCase().includes(search.toLowerCase())) : notes;

  function renderNotes() {
    return filteredNotes.map((note) => {
      return <NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted} />;
    });
  }

  return (
    <div className='mx-auto max-w-6xl my-12 space-y-6 px-5 xl:px-0'>
      <img src={logo} alt="NLW Expert" />
      <form className='w-full'>
        <input
          placeholder='Busque em suas notas...'
          type="text"
          className='w-full bg-transparent text-xl font-semibold tracking-tighter placeholder:text-slate-500 outline-none sm:text-3xl'
          value={search}
          onChange={handleSearch}
        />
      </form>
      <div className='h-px bg-slate-700' />
      <div className='grid gap-6 auto-rows-[250px] grid-cols-1 lg:grid-cols-3 sm:grid-cols-2'>
        <NewNoteCard onNoteCreated={onNoteCreated} />
        {renderNotes()}
      </div>
    </div>
  );
}
