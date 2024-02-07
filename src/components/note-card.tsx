import * as Dialog from '@radix-ui/react-dialog';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { X } from 'lucide-react';
import { ModalCard } from './modal-card';
 
interface NodeCardProps {
    note: {
        date: Date;
        content: string;
    };
}

export function NoteCard({ note }: NodeCardProps) {
    return (
        <Dialog.Root>
            <Dialog.Trigger className='rounded-md flex flex-col text-left bg-slate-800 p-5 gap-3 outline-none overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400'>
                <span className='text-small font-medium text-slate-300'>
                    {formatDistanceToNow(note.date.toISOString(), { locale: ptBR, addSuffix: true })}
                </span>
                <p className='leading-6 font-medium text-slate-400'>
                    {note.content}
                </p>
                <div className='absolute h-30 bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none'>
                </div>
            </Dialog.Trigger>
            <ModalCard>
                <div className='flex flex-1 flex-col gap-3 p-5'>
                    <span className='text-small font-medium text-slate-300'>
                        {formatDistanceToNow(note.date.toISOString(), { locale: ptBR, addSuffix: true })}
                    </span>
                    <p className='leading-6 font-medium text-slate-400'>
                        {note.content}
                    </p>
                </div>
                <button
                    type='button'
                    className='bg-slate-800 py-4 text-sm w-full outline-none font-medium group'
                >
                    Deseja <span className='text-red-400 hover:underline group-hover:underline'>apagar essa nota</span>?
                </button>
            </ModalCard>
        </Dialog.Root>
    );
}