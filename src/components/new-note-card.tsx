import * as Dialog from '@radix-ui/react-dialog';
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'sonner';

import { ModalCard } from './modal-card';

interface NewNoteCardProps {
    onNoteCreated: (content: string) => void;
}

let speechRecognition: SpeechRecognition | null = null;

export function NewNoteCard({ onNoteCreated }: NewNoteCardProps) {
    const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true);
    const [content, setContent] = useState('');
    const [isRecording, setIsRecording] = useState(false);

    function handleStartEditor() {
        setShouldShowOnboarding(false);
    }

    function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
        setContent(event.target.value);
        if (!event.target.value) {
            setShouldShowOnboarding(true);
        }
    }

    function handleSaveNote() {
        if (!content) {
            return;
        }

        onNoteCreated(content);
        setContent('');
        setShouldShowOnboarding(true);
        toast('Nota criada com sucesso!');
    }

    function handleStartRecording() {
        const isSpeechRecognitionAPIAvailable = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;

        if (!isSpeechRecognitionAPIAvailable) {
            return alert('Infelizmente seu navegador não suporta essa funcionalidade!');
        }

        setIsRecording(true);
        setShouldShowOnboarding(false);

        const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;

        speechRecognition = new SpeechRecognitionAPI();

        speechRecognition.lang = 'pt-BR'
        speechRecognition.continuous = true;
        speechRecognition.maxAlternatives = 1;
        speechRecognition.interimResults = true;

        speechRecognition.onresult = ((event) => {
            const transcription = Array.from(event.results).reduce((text, result) => {
                return text.concat(result[0].transcript);
            }, '');
            setContent(transcription);
        });

        speechRecognition.onerror = ((event) => {
            console.log(event);
        });

        speechRecognition.start();
    }

    function handleStopRecording() {
        setIsRecording(false);

        if (speechRecognition) {
            speechRecognition.stop();
        }
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
                <form className='flex flex-1 flex-col'>
                    <div className='flex flex-1 flex-col gap-3 p-5'>
                        <span className='text-small font-medium text-slate-300 text-sm'>
                            Adicionar nota
                        </span>
                        {shouldShowOnboarding ? (
                            <p className='leading-6 font-medium text-slate-400 text-sm'>
                                Comece <button type="button" onClick={handleStartRecording} className='text-lime-400 hover:underline'>gravando uma nota</button> em áudio ou se preferir <button onClick={handleStartEditor} type="button" className='text-lime-400 hover:underline'>utilize apenas texto</button>.
                            </p>
                        ) : (
                            <textarea
                                autoFocus
                                className='text-sm leading-6 text-slate-400 bg-transparent resize-none outline-none flex-1'
                                onChange={handleContentChanged}
                                value={content}
                            />
                        )}
                    </div>
                    {isRecording ? (
                        <button
                            type='button'
                            className='bg-slate-900 py-4 text-sm w-full outline-none font-medium flex items-center justify-center gap-2 text-slate-300 hover:text-slate-100'
                            onClick={handleStopRecording}
                        >
                            <div className='bg-red-500 size-4 rounded-full animate-pulse'></div>
                            Gravando... (clique p/ interromper)
                        </button>
                    ) : (
                        <button
                            type='button'
                            className='bg-lime-400 py-4 text-sm w-full outline-none font-medium text-lime-950 hover:bg-lime-500'
                            onClick={handleSaveNote}
                        >
                            Salvar nota
                        </button>
                    )}
                </form>
            </ModalCard>
        </Dialog.Root>
    );
}