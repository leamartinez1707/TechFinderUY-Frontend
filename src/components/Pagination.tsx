import { Button } from './ui/button'

const Pagination = () => {
    return (
        <div className="flex justify-center mt-6">
            <Button variant="outline" size="sm" className="mx-1">
                Anterior
            </Button>
            <Button variant="outline" size="sm" className="mx-1">
                1
            </Button>
            <Button variant="outline" size="sm" className="mx-1">
                2
            </Button>
            <Button variant="outline" size="sm" className="mx-1">
                3
            </Button>
            <Button variant="outline" size="sm" className="mx-1">
                Siguiente
            </Button>
        </div>)
}

export default Pagination