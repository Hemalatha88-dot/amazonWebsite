const BASE_URL = 'https://dummyjson.com'

async function parseResponse(response, fallbackMessage) {
  if (!response.ok) {
    throw new Error(`${fallbackMessage} (${response.status})`)
  }
  return response.json()
}

export async function fetchProducts({ limit, skip }) {
  const params = new URLSearchParams({
    limit: String(limit),
    skip: String(skip),
  })
  const response = await fetch(`${BASE_URL}/products?${params}`)
  return parseResponse(response, 'Failed to fetch products')
}

export async function fetchAllProducts() {
  const response = await fetch(`${BASE_URL}/products?limit=0`)
  return parseResponse(response, 'Failed to fetch products')
}

export async function fetchCategories() {
  const response = await fetch(`${BASE_URL}/products/categories`)
  return parseResponse(response, 'Failed to fetch categories')
}

export async function fetchProductsByCategory(categorySlug) {
  const response = await fetch(
    `${BASE_URL}/products/category/${encodeURIComponent(categorySlug)}?limit=0`,
  )
  return parseResponse(response, 'Failed to fetch category products')
}

export async function fetchProductById(id) {
  const response = await fetch(`${BASE_URL}/products/${encodeURIComponent(id)}`)

  if (response.status === 404) {
    throw new Error('Product not found.')
  }

  return parseResponse(response, 'Failed to fetch product')
}