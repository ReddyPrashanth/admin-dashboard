const Pagination = ({page, limit, totalItems, onPaginate}) => {
    const totalPages = Math.ceil(totalItems/limit);
    return (
        <div className="flex justify-between items-center px-6 py-2 w-full border-l border-r border-b">
            <div>
                Showing users from {limit * (page -1) + 1} to {limit * page}
            </div>
            <div className="space-x-1">
                <button className="px-4 py-2 text-gray-500 rounded bg-gray-100" disabled={page === 1} onClick={() => onPaginate(page - 1)}>Previous</button>
                <button className="px-4 py-2 text-gray-500 rounded bg-gray-100" disabled={page === totalPages} onClick={() => onPaginate(page + 1)}>Next</button>
            </div>
        </div>
    )
}

export default Pagination;