import { Button } from './ui/button'

const Pagination = ({ totalPages, itemsPerPage, currentPage, onPageChange, ...props }) => {
    if (totalPages === 0) return null;
    return (
        <div
            {...props}
            className="flex justify-center mt-6">
            <Button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                variant="outline" size="sm" className="mx-1">
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
            <Button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage * itemsPerPage >= totalPages}
                variant="outline" size="sm" className="mx-1">
                Siguiente
            </Button>
        </div>)
}

export default Pagination