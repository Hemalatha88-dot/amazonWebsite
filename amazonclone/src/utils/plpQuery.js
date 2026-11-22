const ALL_CATEGORY = 'all'

export function readPlpStateFromSearchParams(searchParams) {
  const category = searchParams.get('category') || ALL_CATEGORY
  const brandsParam = searchParams.get('brands')
  const brands = brandsParam ? brandsParam.split(',').filter(Boolean) : []
  const page = Math.max(1, Number.parseInt(searchParams.get('page') || '1', 10) || 1)

  const minPriceRaw = searchParams.get('minPrice')
  const maxPriceRaw = searchParams.get('maxPrice')

  const appliedMinPrice =
    minPriceRaw !== null && minPriceRaw !== ''
      ? Number.parseFloat(minPriceRaw)
      : null
  const appliedMaxPrice =
    maxPriceRaw !== null && maxPriceRaw !== ''
      ? Number.parseFloat(maxPriceRaw)
      : null

  return {
    selectedCategory: category,
    selectedBrands: brands,
    currentPage: page,
    appliedMinPrice: Number.isNaN(appliedMinPrice) ? null : appliedMinPrice,
    appliedMaxPrice: Number.isNaN(appliedMaxPrice) ? null : appliedMaxPrice,
    minPriceInput: searchParams.get('minInput') ?? '',
    maxPriceInput: searchParams.get('maxInput') ?? '',
  }
}

export function serializePlpState({
  selectedCategory,
  selectedBrands,
  appliedMinPrice,
  appliedMaxPrice,
  minPriceInput,
  maxPriceInput,
  currentPage,
}) {
  const params = new URLSearchParams()

  if (selectedCategory && selectedCategory !== ALL_CATEGORY) {
    params.set('category', selectedCategory)
  }

  if (selectedBrands?.length > 0) {
    params.set('brands', selectedBrands.join(','))
  }

  if (appliedMinPrice !== null && appliedMinPrice !== undefined) {
    params.set('minPrice', String(appliedMinPrice))
  }

  if (appliedMaxPrice !== null && appliedMaxPrice !== undefined) {
    params.set('maxPrice', String(appliedMaxPrice))
  }

  if (minPriceInput) {
    params.set('minInput', minPriceInput)
  }

  if (maxPriceInput) {
    params.set('maxInput', maxPriceInput)
  }

  if (currentPage > 1) {
    params.set('page', String(currentPage))
  }

  return params
}

export function buildPlpQueryString(state) {
  const query = serializePlpState(state).toString()
  return query ? `?${query}` : ''
}