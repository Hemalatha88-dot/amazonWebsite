import { useEffect, useMemo, useRef, useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import EmptyState from '../components/common/EmptyState'
import ErrorState from '../components/common/ErrorState'
import LoadingState from '../components/common/LoadingState'
import Pagination from '../components/common/Pagination'
import FilterSidebar from '../components/filters/FilterSidebar'
import Header from '../components/layout/Header'
import ProductGrid from '../components/products/ProductGrid'
import {
  fetchAllProducts,
  fetchCategories,
  fetchProductsByCategory,
} from '../services/productsApi'
import {
  filterProducts,
  getUniqueBrands,
  parsePriceInput,
} from '../utils/filterProducts'
import './ProductListingPage.css'

const PRODUCTS_PER_PAGE = 8
const ALL_CATEGORY = 'all'

function normalizeCategories(data) {
  if (!Array.isArray(data)) {
    return []
  }

  return data.map((item) => {
    if (typeof item === 'string') {
      return {
        slug: item,
        name: item.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      }
    }

    return {
      slug: item.slug,
      name: item.name,
    }
  })
}

function ProductListingPage() {
  const [categories, setCategories] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [categoryProducts, setCategoryProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORY)
  const [selectedBrands, setSelectedBrands] = useState([])
  const [minPriceInput, setMinPriceInput] = useState('')
  const [maxPriceInput, setMaxPriceInput] = useState('')
  const [appliedMinPrice, setAppliedMinPrice] = useState(null)
  const [appliedMaxPrice, setAppliedMaxPrice] = useState(null)
  const [priceError, setPriceError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [categoryLoading, setCategoryLoading] = useState(false)
  const [error, setError] = useState(null)
  const [reloadToken, setReloadToken] = useState(0)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const listingRef = useRef(null)

  const sourceProducts = useMemo(() => {
    if (selectedCategory === ALL_CATEGORY) {
      return allProducts
    }
    return categoryProducts
  }, [selectedCategory, allProducts, categoryProducts])

  const availableBrands = useMemo(
    () => getUniqueBrands(allProducts),
    [allProducts],
  )

  const filteredProducts = useMemo(
    () =>
      filterProducts(sourceProducts, {
        minPrice: appliedMinPrice,
        maxPrice: appliedMaxPrice,
        selectedBrands,
      }),
    [sourceProducts, appliedMinPrice, appliedMaxPrice, selectedBrands],
  )

  const filteredTotal = filteredProducts.length
  const totalPages = Math.max(1, Math.ceil(filteredTotal / PRODUCTS_PER_PAGE))
  const effectivePage = Math.min(currentPage, totalPages)

  const paginatedProducts = useMemo(() => {
    const start = (effectivePage - 1) * PRODUCTS_PER_PAGE
    return filteredProducts.slice(start, start + PRODUCTS_PER_PAGE)
  }, [filteredProducts, effectivePage])

  const hasActiveFilters =
    selectedCategory !== ALL_CATEGORY ||
    selectedBrands.length > 0 ||
    appliedMinPrice !== null ||
    appliedMaxPrice !== null

  useEffect(() => {
    let cancelled = false

    Promise.all([fetchCategories(), fetchAllProducts()])
      .then(([categoriesData, productsData]) => {
        if (cancelled) return
        setCategories(normalizeCategories(categoriesData))
        setAllProducts(productsData.products)
        setError(null)
      })
      .catch((err) => {
        if (cancelled) return
        setCategories([])
        setAllProducts([])
        setError(err.message || 'Something went wrong while loading products.')
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [reloadToken])

  const resetToFirstPage = () => {
    setCurrentPage(1)
  }

  const handleCategoryChange = (categorySlug) => {
    if (categorySlug === selectedCategory) {
      return
    }

    setSelectedCategory(categorySlug)
    resetToFirstPage()
    setError(null)

    if (categorySlug === ALL_CATEGORY) {
      setCategoryProducts([])
      setCategoryLoading(false)
      return
    }

    setCategoryProducts([])
    setCategoryLoading(true)

    fetchProductsByCategory(categorySlug)
      .then((data) => {
        setCategoryProducts(data.products)
        setError(null)
      })
      .catch((err) => {
        setCategoryProducts([])
        setError(
          err.message || 'Something went wrong while loading category products.',
        )
      })
      .finally(() => {
        setCategoryLoading(false)
      })
  }

  const handleBrandToggle = (brand) => {
    setSelectedBrands((prev) => {
      if (prev.includes(brand)) {
        return prev.filter((item) => item !== brand)
      }
      return [...prev, brand]
    })
    resetToFirstPage()
  }

  const handleApplyPrice = () => {
    setPriceError('')

    const min = parsePriceInput(minPriceInput)
    const max = parsePriceInput(maxPriceInput)

    if (
      minPriceInput.trim() !== '' &&
      maxPriceInput.trim() !== '' &&
      min !== null &&
      max !== null &&
      min > max
    ) {
      setPriceError('Minimum price cannot be greater than maximum price.')
      return
    }

    setAppliedMinPrice(min)
    setAppliedMaxPrice(max)
    resetToFirstPage()
  }

  const handleClearAll = () => {
    setSelectedCategory(ALL_CATEGORY)
    setCategoryProducts([])
    setCategoryLoading(false)
    setSelectedBrands([])
    setMinPriceInput('')
    setMaxPriceInput('')
    setAppliedMinPrice(null)
    setAppliedMaxPrice(null)
    setPriceError('')
    resetToFirstPage()
  }

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages || page === effectivePage) {
      return
    }
    setCurrentPage(page)
    listingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleRetry = () => {
    setLoading(true)
    setReloadToken((token) => token + 1)
  }

  const isListLoading = loading || categoryLoading
  const showEmpty = !isListLoading && !error && filteredTotal === 0
  const showGrid = !isListLoading && !error && filteredTotal > 0

  const resultStart =
    filteredTotal === 0 ? 0 : (effectivePage - 1) * PRODUCTS_PER_PAGE + 1
  const resultEnd = Math.min(effectivePage * PRODUCTS_PER_PAGE, filteredTotal)

  return (
    <div className="plp">
      <Header />

      <main className="plp__main">
        <div className="plp__container">
          <div className="plp__content-card">
            <div className="plp__layout">
              <FilterSidebar
                categories={categories}
                brands={availableBrands}
                selectedCategory={selectedCategory}
                selectedBrands={selectedBrands}
                minPriceInput={minPriceInput}
                maxPriceInput={maxPriceInput}
                priceError={priceError}
                loading={isListLoading}
                filtersOpen={filtersOpen}
                onCloseMobile={() => setFiltersOpen(false)}
                onCategoryChange={handleCategoryChange}
                onBrandToggle={handleBrandToggle}
                onMinChange={setMinPriceInput}
                onMaxChange={setMaxPriceInput}
                onApplyPrice={handleApplyPrice}
                onClearAll={handleClearAll}
                hasActiveFilters={hasActiveFilters}
              />

              <div className="plp__content">
                <div className="plp__toolbar" ref={listingRef}>
                  <div className="plp__toolbar-start">
                    <button
                      type="button"
                      className="plp__filters-toggle"
                      onClick={() => setFiltersOpen((open) => !open)}
                      aria-expanded={filtersOpen}
                      aria-controls="product-filters"
                    >
                      <SlidersHorizontal size={18} strokeWidth={2} aria-hidden="true" />
                      Filters
                    </button>
                    <h1 className="plp__heading">
                      <SlidersHorizontal
                        className="plp__heading-icon plp__heading-icon--desktop"
                        size={20}
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                      Products
                    </h1>
                  </div>
                  {!isListLoading && !error && (
                    <p className="plp__result-count">
                      Showing {resultStart}–{resultEnd} of {filteredTotal}
                    </p>
                  )}
                </div>

                {isListLoading && <LoadingState />}
                {!isListLoading && error && (
                  <ErrorState message={error} onRetry={handleRetry} />
                )}
                {showGrid && <ProductGrid products={paginatedProducts} />}
                {showEmpty && <EmptyState />}

                {showGrid && (
                  <Pagination
                    currentPage={effectivePage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ProductListingPage