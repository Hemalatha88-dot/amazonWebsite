import { Link } from 'react-router-dom'
import StarRating from '../common/StarRating'

function ProductCard({ product, listingPath }) {
  const { id, title, price, rating, thumbnail, brand, category } = product

  return (
    <Link
      to={`/product/${id}`}
      state={{ from: listingPath }}
      className="product-card product-card--link"
    >
      <article className="product-card__inner">
        <div className="product-card__image-wrap">
          <img
            className="product-card__image"
            src={thumbnail}
            alt={title}
            loading="lazy"
          />
        </div>
        <div className="product-card__body">
          <h2 className="product-card__title">{title}</h2>
          <p className="product-card__price">${price}</p>
          <StarRating rating={rating} className="product-card__rating" />
          {(brand || category) && (
            <div className="product-card__meta">
              {brand && <span className="product-card__brand">{brand}</span>}
              {brand && category && <span className="product-card__meta-sep">·</span>}
              {category && (
                <span className="product-card__category">{category}</span>
              )}
            </div>
          )}
        </div>
        <span className="visually-hidden">Product ID {id}</span>
      </article>
    </Link>
  )
}

export default ProductCard