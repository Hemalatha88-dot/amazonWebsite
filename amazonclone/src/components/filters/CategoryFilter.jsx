function CategoryFilter({ categories, selectedCategory, onCategoryChange, disabled }) {
  return (
    <fieldset className="filter-section" disabled={disabled}>
      <legend className="filter-section__title">Categories</legend>
      <ul className="filter-list filter-list--scroll">
        <li>
          <label className="filter-option">
            <input
              type="radio"
              name="category"
              value="all"
              checked={selectedCategory === 'all'}
              onChange={() => onCategoryChange('all')}
            />
            <span>All Categories</span>
          </label>
        </li>
        {categories.map((category) => (
          <li key={category.slug}>
            <label className="filter-option">
              <input
                type="radio"
                name="category"
                value={category.slug}
                checked={selectedCategory === category.slug}
                onChange={() => onCategoryChange(category.slug)}
              />
              <span>{category.name}</span>
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  )
}

export default CategoryFilter