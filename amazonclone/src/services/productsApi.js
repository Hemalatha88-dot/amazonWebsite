const BASE_URL = 'https://dummyjson.com'

export async function fetchProducts({ limit, skip }) {
  const params = new URLSearchParams({
    limit: String(limit),
    skip: String(skip),
  })
  const response = await fetch(`${BASE_URL}/products?${params}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch products (${response.status})`)
  }

  return response.json()
}