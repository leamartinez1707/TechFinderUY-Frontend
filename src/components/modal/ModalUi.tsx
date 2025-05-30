import { Dialog, DialogClose, DialogContent, DialogFooter } from '../ui/dialog'


interface ModalUiProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    children?: React.ReactNode;
}
const ModalUi = ({ open, setOpen, children }: ModalUiProps) => {
    return (
        <Dialog
            open={open} onOpenChange={setOpen}>
            {children}
            <DialogFooter>
                <DialogClose
                    onClick={() => setOpen(!open)}
                    className="btn text-black">Cancelar
                </DialogClose>
            </DialogFooter>
        </Dialog>
    )
}

export default ModalUi