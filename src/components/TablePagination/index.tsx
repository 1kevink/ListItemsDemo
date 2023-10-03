import './index.css'
type TablePaginationProps = {
  setCurrentPage: (value: number) => void,
  numbers: number[],
  currentPage: number
}

type PaginationItemProps = {
  currentPage: number,
  page: number,
  onChange: (value: number) => void
}

const PaginationItem = ({ currentPage, page, onChange} : PaginationItemProps) => {
  return (
    <li className={`page-item ${page === currentPage ? 'active' : ''}`} onClick={() => onChange(page)}>
      <span className="page-link">
        {page}
      </span>
    </li>
  )
}

const TablePagination = ({ numbers, currentPage, setCurrentPage } : TablePaginationProps) => {
  return (
    <ul className="pagination">
      {numbers.map((number) => (
        <PaginationItem
          currentPage={currentPage}
          key={number}
          page={number}
          onChange={setCurrentPage}
        />
        ))
      }
    </ul>
  )
}

export default TablePagination