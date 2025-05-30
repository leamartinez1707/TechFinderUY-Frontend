import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'


interface ModalUiProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    children?: React.ReactNode;
    firstName?: string;
    lastName?: string;
}
const ModalUi = ({ open, setOpen, children, firstName, lastName }: ModalUiProps) => {
    return (
        <Dialog
            open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-lg font-bold">
                        Enviar reserva a <span className="capitalize">{firstName}</span> <span className="capitalize">{lastName}</span>
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription className="text-base text-gray-900 mb-4">
                    Completa el formulario para enviar una reserva al técnico seleccionado.
                </DialogDescription>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default ModalUi