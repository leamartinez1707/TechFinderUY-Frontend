import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'


interface ModalUiProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    title: string
    description: string
    technicianId?: number;
    children?: React.ReactNode;
}
const ModalUi = ({ open, setOpen, title, description, children }: ModalUiProps) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild className="btn">Open Modal</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <DialogContent>
                    {children}
                </DialogContent>
                <DialogFooter>
                    <DialogClose
                        onClick={() => setOpen(!open)}
                        className="btn text-black">Cancelar
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ModalUi