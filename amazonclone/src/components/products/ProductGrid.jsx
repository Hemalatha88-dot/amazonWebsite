import ProductCard from './ProductCard'

function ProductGrid({ products, listingPath }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          listingPath={listingPath}
        />
      ))}
    </div>
  )
}

export default ProductGrid