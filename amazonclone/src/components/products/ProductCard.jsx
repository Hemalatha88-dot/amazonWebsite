import { Star } from 'lucide-react'

const ICON_STROKE = 2
const STAR_SIZE = 14

function StarRating({ rating }) {
  const fullStars = Math.floor(rating)
  const stars = []

  for (let i = 0; i < 5; i++) {
    const filled = i < fullStars
    stars.push(
      <Star
        key={i}
        className={`product-card__star${filled ? ' product-card__star--filled' : ''}`}
        size={STAR_SIZE}
        strokeWidth={ICON_STROKE}
        fill={filled ? 'currentColor' : 'none'}
        aria-hidden="true"
      />,
    )
  }

  return (
    <div className="product-card__rating" aria-label={`Rating ${rating} out of 5`}>
      {stars}
      <span className="product-card__rating-value">({rating})</span>
    </div>
  )
}

function ProductCard({ product }) {
  const { id, title, price, rating, thumbnail, brand, category } = product

  return (
    <article className="product-card">
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
        <StarRating rating={rating} />
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
  )
}

export default ProductCard