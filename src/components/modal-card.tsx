import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

interface ModalCardProps {
    children: React.ReactNode;
}

export function ModalCard({ children }: ModalCardProps) {
    return (
        <Dialog.Portal>
            <Dialog.Overlay className='inset-0 fixed bg-black/50'>
                <Dialog.Content className='fixed left-1/2 top-1/2 -translate-x-1/2 overflow-hidden -translate-y-1/2 max-w-[640px] w-[95%] h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none'>
                    <Dialog.Close className='bg-slate-800 absolute right-0 top-0 p-1.5 text-slate-400 hover:text-slate-100'>
                        <X className='size-5' />
                    </Dialog.Close>
                    {children}
                </Dialog.Content>
            </Dialog.Overlay>
        </Dialog.Portal>
    )
}