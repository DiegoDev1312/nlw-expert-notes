import logo from './assets/mini-logo-nlw-expert.svg';
import { NewNoteCart } from './components/new-note-cart';
import { NoteCart } from './components/note-cart';

export function App() {
  return (
    <div className='mx-auto max-w-6xl my-12 space-y-6'>
      <img src={logo} alt="NLW Expert" />
      <form className='w-full'>
        <input
          placeholder='Busque em suas notas...'
          type="text"
          className='w-full bg-transparent text-3xl font-semibold tracking-tighter placeholder:text-slate-500 outline-none'
        />
      </form>
      <div className='h-px bg-slate-700' />
      <div className='grid grid-cols-3 gap-6 auto-rows-[250px]'>
        <NewNoteCart />
        <NoteCart />
        <NoteCart />
        <NoteCart />
      </div>
    </div>
  );
}
