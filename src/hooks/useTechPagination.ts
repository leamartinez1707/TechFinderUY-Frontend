import { Technicians } from "@/types";
import { useMemo, useState } from "react";

export interface useTechPaginationProps {
    filteredTechnicians: (Technicians & { distance?: number })[]
    itemsPerPage?: number;
}
const useTechPagination = ({ filteredTechnicians: technicians, itemsPerPage = 1 }: useTechPaginationProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [techniciansOrder, setTechniciansOrder] = useState<"asc" | "desc">("asc");

    // const filteredBookings = useMemo(() => {
    //     // Filtrar las reservas según el estado activo del tab
    //     return technicians.filter(b => b.id === activeTab);
    // }, [technicians]);

    const paginatedTechnicians = useMemo(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const sorted = [...technicians].sort((a, b) =>
            techniciansOrder === "asc"
                ? new Date(a.id).getTime() - new Date(b.id).getTime()
                : new Date(b.id).getTime() - new Date(a.id).getTime()
        );

        return sorted.slice(indexOfFirstItem, indexOfLastItem);
    }, [currentPage, itemsPerPage, technicians, techniciansOrder]);

    const totalPages = Math.ceil(technicians.length / itemsPerPage);
    return {
        currentPage, totalPages, setCurrentPage, setTechniciansOrder, techniciansOrder, paginatedTechnicians
    }
}

export default useTechPagination