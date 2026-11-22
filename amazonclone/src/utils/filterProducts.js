export function parsePriceInput(value) {
  if (value === '' || value === null || value === undefined) {
    return null
  }
  const parsed = Number(value)
  if (Number.isNaN(parsed) || parsed < 0) {
    return null
  }
  return parsed
}

export function filterProducts(products, { minPrice, maxPrice, selectedBrands }) {
  return products.filter((product) => {
    const price = product.price

    if (minPrice !== null && price < minPrice) {
      return false
    }

    if (maxPrice !== null && price > maxPrice) {
      return false
    }

    if (selectedBrands.length > 0) {
      const brand = product.brand?.trim()
      if (!brand || !selectedBrands.includes(brand)) {
        return false
      }
    }

    return true
  })
}

export function getUniqueBrands(products) {
  const brands = new Set()

  for (const product of products) {
    const brand = product.brand?.trim()
    if (brand) {
      brands.add(brand)
    }
  }

  return Array.from(brands).sort((a, b) => a.localeCompare(b))
}