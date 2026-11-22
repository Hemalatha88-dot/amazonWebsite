import { X } from 'lucide-react'
import BrandFilter from './BrandFilter'
import CategoryFilter from './CategoryFilter'
import PriceRangeFilter from './PriceRangeFilter'

function FilterSidebar({
  categories,
  brands,
  selectedCategory,
  selectedBrands,
  minPriceInput,
  maxPriceInput,
  priceError,
  loading,
  filtersOpen,
  onCloseMobile,
  onCategoryChange,
  onBrandToggle,
  onMinChange,
  onMaxChange,
  onApplyPrice,
  onClearAll,
  hasActiveFilters,
}) {
  return (
    <aside
      id="product-filters"
      className={`plp__sidebar${filtersOpen ? ' plp__sidebar--open' : ''}`}
      aria-label="Product filters"
    >
      <div className="plp__sidebar-header">
        <h2 className="plp__sidebar-title">Filters</h2>
        <button
          type="button"
          className="plp__sidebar-close"
          onClick={onCloseMobile}
          aria-label="Close filters"
        >
          <X size={20} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>

      <div className="plp__sidebar-body">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
          disabled={loading}
        />

        <PriceRangeFilter
          minPrice={minPriceInput}
          maxPrice={maxPriceInput}
          priceError={priceError}
          onMinChange={onMinChange}
          onMaxChange={onMaxChange}
          onApply={onApplyPrice}
          disabled={loading}
        />

        <BrandFilter
          brands={brands}
          selectedBrands={selectedBrands}
          onBrandToggle={onBrandToggle}
          disabled={loading}
        />

        {hasActiveFilters && (
          <button
            type="button"
            className="btn btn--outline btn--block"
            onClick={onClearAll}
            disabled={loading}
          >
            Clear All Filters
          </button>
        )}
      </div>
    </aside>
  )
}

export default FilterSidebar