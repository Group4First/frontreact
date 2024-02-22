import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";


export function Paginationbuttons({ totalPages, setCurrentPage}) {
    
    const handlePageClick = ({ selected }) => {
   
        setCurrentPage(selected)

    }
    return (
        <div>
            <ReactPaginate
                breakLabel={
                    <span className="mr-4">...</span>
                }
                nextLabel={
                    <span className="w-10 h-10 flex items-center justify-center bg-white rounded-md">
                        <ChevronRight />
                    </span>
                }
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                pageCount={totalPages}
                previousLabel={<span className="w-10 h-10 flex items-center justify-center bg-white rounded-md mr-4">
                    <ChevronLeft />
                </span>}
                containerClassName="flex items-center justify-center mt-8 mb-4"
                pageClassName="block border- border-solid border-lightGray bg-white hover:bg-vgreen hover:text-white text-black w-10 h-10 flex items-center justify-center rounded-md mr-4"
                activeClassName="bg-[#00AF00] text-white"
            />
        </div>
    )

}