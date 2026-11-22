function PriceRangeFilter({
  minPrice,
  maxPrice,
  priceError,
  onMinChange,
  onMaxChange,
  onApply,
  disabled,
}) {
  return (
    <fieldset className="filter-section" disabled={disabled}>
      <legend className="filter-section__title">Price Range</legend>
      <div className="price-range">
        <input
          type="number"
          className="filter-input"
          placeholder="Min"
          min="0"
          step="0.01"
          value={minPrice}
          onChange={(event) => onMinChange(event.target.value)}
          aria-label="Minimum price"
        />
        <input
          type="number"
          className="filter-input"
          placeholder="Max"
          min="0"
          step="0.01"
          value={maxPrice}
          onChange={(event) => onMaxChange(event.target.value)}
          aria-label="Maximum price"
        />
      </div>
      {priceError && <p className="filter-section__error">{priceError}</p>}
      <button type="button" className="btn btn--primary btn--block" onClick={onApply}>
        Apply
      </button>
    </fieldset>
  )
}

export default PriceRangeFilter