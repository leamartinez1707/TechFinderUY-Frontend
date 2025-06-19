import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    setCurrentPage: (page: number) => void;
}

const PaginationUi = ({ currentPage, totalPages, onPageChange, setCurrentPage }: PaginationProps) => {

    const handleChange = (_: unknown, value: number) => {
        setCurrentPage(value);
        onPageChange(value);
    };
    if (totalPages === 0) return null;
    return (
        <Stack spacing={2} alignItems='center' padding={4}>
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handleChange}
                variant="outlined"
                shape="rounded"
                sx={{
                    '& .MuiPaginationItem-root': {
                        color: 'black', // Color del texto
                        backgroundColor: '#4b5dfd', // Color de fondo
                        '&:hover': {
                            backgroundColor: '#3c4ac5', // Color de fondo al pasar el cursor
                        },
                        '&.Mui-selected': {
                            backgroundColor: '#ffff', // Color de fondo cuando está seleccionado
                            color: 'black', // Color del texto cuando está seleccionado
                            '&:hover': {
                                backgroundColor: '#b4b4b4', // Color de fondo al pasar el cursor cuando está seleccionado
                            },
                        },
                    },
                }}
            />
        </Stack>
    );
};

export default PaginationUi;