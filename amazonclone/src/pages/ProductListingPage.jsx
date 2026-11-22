import { useEffect, useRef, useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import ErrorState from '../components/common/ErrorState'
import LoadingState from '../components/common/LoadingState'
import Pagination from '../components/common/Pagination'
import Header from '../components/layout/Header'
import ProductGrid from '../components/products/ProductGrid'
import { fetchProducts } from '../services/productsApi'
import './ProductListingPage.css'

const PRODUCTS_PER_PAGE = 8

function ProductListingPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadToken, setReloadToken] = useState(0)
  const listingRef = useRef(null)

  const totalPages = Math.max(1, Math.ceil(total / PRODUCTS_PER_PAGE))

  useEffect(() => {
    let cancelled = false

    fetchProducts({
      limit: PRODUCTS_PER_PAGE,
      skip: (currentPage - 1) * PRODUCTS_PER_PAGE,
    })
      .then((data) => {
        if (cancelled) return
        setProducts(data.products)
        setTotal(data.total)
        setError(null)
      })
      .catch((err) => {
        if (cancelled) return
        setProducts([])
        setError(
          err.message || 'Something went wrong while loading products.',
        )
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [currentPage, reloadToken])

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) {
      return
    }
    setLoading(true)
    setCurrentPage(page)
    listingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleRetry = () => {
    setLoading(true)
    setReloadToken((token) => token + 1)
  }

  return (
    <div className="plp">
      <Header />

      <main className="plp__main">
        <div className="plp__container">
          <div className="plp__content-card">
            <div className="plp__toolbar" ref={listingRef}>
              <h1 className="plp__heading">
                <SlidersHorizontal
                  className="plp__heading-icon"
                  size={20}
                  strokeWidth={2}
                  aria-hidden="true"
                />
                Products
              </h1>
              {!loading && !error && (
                <p className="plp__result-count">
                  Showing {(currentPage - 1) * PRODUCTS_PER_PAGE + 1}–
                  {Math.min(currentPage * PRODUCTS_PER_PAGE, total)} of {total}
                </p>
              )}
            </div>

            {loading && <LoadingState />}
            {!loading && error && (
              <ErrorState message={error} onRetry={handleRetry} />
            )}
            {!loading && !error && <ProductGrid products={products} />}

            {!loading && !error && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default ProductListingPage