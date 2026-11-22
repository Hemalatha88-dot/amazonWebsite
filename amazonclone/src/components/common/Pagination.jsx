import { ChevronLeft, ChevronRight } from 'lucide-react'

const ICON_STROKE = 2
const NAV_ICON_SIZE = 16

function buildPageNumbers(currentPage, totalPages, maxVisible = 5) {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const half = Math.floor(maxVisible / 2)
  let start = Math.max(1, currentPage - half)
  let end = start + maxVisible - 1

  if (end > totalPages) {
    end = totalPages
    start = Math.max(1, end - maxVisible + 1)
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) {
    return null
  }

  const pages = buildPageNumbers(currentPage, totalPages)
  const isFirst = currentPage === 1
  const isLast = currentPage === totalPages

  return (
    <nav className="pagination" aria-label="Product pages">
      <button
        type="button"
        className="pagination__nav"
        disabled={isFirst}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeft
          className="pagination__arrow"
          size={NAV_ICON_SIZE}
          strokeWidth={ICON_STROKE}
          aria-hidden="true"
        />
        Previous
      </button>

      <ul className="pagination__pages">
        {pages.map((page) => (
          <li key={page}>
            <button
              type="button"
              className={`pagination__page${page === currentPage ? ' pagination__page--active' : ''}`}
              aria-current={page === currentPage ? 'page' : undefined}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="pagination__nav"
        disabled={isLast}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
        <ChevronRight
          className="pagination__arrow"
          size={NAV_ICON_SIZE}
          strokeWidth={ICON_STROKE}
          aria-hidden="true"
        />
      </button>
    </nav>
  )
}

export default Pagination