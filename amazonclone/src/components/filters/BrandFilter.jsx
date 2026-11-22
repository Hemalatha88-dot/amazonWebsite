function BrandFilter({ brands, selectedBrands, onBrandToggle, disabled }) {
  if (brands.length === 0) {
    return (
      <fieldset className="filter-section" disabled={disabled}>
        <legend className="filter-section__title">Brands</legend>
        <p className="filter-section__hint">No brands available.</p>
      </fieldset>
    )
  }

  return (
    <fieldset className="filter-section" disabled={disabled}>
      <legend className="filter-section__title">Brands</legend>
      <ul className="filter-list filter-list--scroll">
        {brands.map((brand) => {
          const isChecked = selectedBrands.includes(brand)
          return (
            <li key={brand}>
              <label className="filter-option">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onBrandToggle(brand)}
                />
                <span>{brand}</span>
              </label>
            </li>
          )
        })}
      </ul>
    </fieldset>
  )
}

export default BrandFilter