export function NewNoteCart() {
    return (
        <div className='rounded-md bg-slate-700 p-5 space-y-3'>
            <span className='text-small font-medium text-slate-200'>
                Adicionar nota
            </span>
            <p className='leading-6 font-medium text-slate-400'>
                Grave uma nota em áudio que será convertida para texto automaticamente.
            </p>
        </div>
    );
}