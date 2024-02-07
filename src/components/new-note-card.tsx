import * as Dialog from '@radix-ui/react-dialog';
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'sonner';

import { ModalCard } from './modal-card';

export function NewNoteCard() {
    const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true);
    const [content, setContent] = useState('');

    function handleStartEditor() {
        setShouldShowOnboarding(false);
    }

    function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
        setContent(event.target.value);
        if (!event.target.value) {
            setShouldShowOnboarding(true);
        }
    }

    function handleSaveNote(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        toast('Nota criada com sucesso!');

        console.log(content)
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger className='rounded-md bg-slate-700 p-5 gap-3 text-start flex flex-col hover:ring-2 outline-none hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400'>
                <span className='text-small font-medium text-slate-200'>
                    Adicionar nota
                </span>
                <p className='leading-6 font-medium text-slate-400'>
                    Grave uma nota em áudio que será convertida para texto automaticamente.
                </p>
            </Dialog.Trigger>
            <ModalCard>
                <form onSubmit={handleSaveNote} className='flex flex-1 flex-col'>
                    <div className='flex flex-1 flex-col gap-3 p-5'>
                        <span className='text-small font-medium text-slate-300 text-sm'>
                            Adicionar nota
                        </span>
                        {shouldShowOnboarding ? (
                            <p className='leading-6 font-medium text-slate-400 text-sm'>
                                Comece <button className='text-lime-400 hover:underline'>gravando uma nota</button> em áudio ou se preferir <button onClick={handleStartEditor} className='text-lime-400 hover:underline'>utilize apenas texto</button>.
                            </p>
                        ) : (
                            <textarea
                                autoFocus
                                className='text-sm leading-6 text-slate-400 bg-transparent resize-none outline-none flex-1'
                                onChange={handleContentChanged}
                            />
                        )}
                    </div>
                    <button
                        type='submit'
                        className='bg-lime-400 py-4 text-sm w-full outline-none font-medium text-lime-950 hover:bg-lime-500'
                    >
                        Salvar nota
                    </button>
                </form>
            </ModalCard>
        </Dialog.Root>
    );
}