import { Star } from 'lucide-react'

const ICON_STROKE = 2

function StarRating({ rating, size = 14, className = '' }) {
  const fullStars = Math.floor(rating)
  const stars = []

  for (let i = 0; i < 5; i++) {
    const filled = i < fullStars
    stars.push(
      <Star
        key={i}
        className={`star-rating__star${filled ? ' star-rating__star--filled' : ''}`}
        size={size}
        strokeWidth={ICON_STROKE}
        fill={filled ? 'currentColor' : 'none'}
        aria-hidden="true"
      />,
    )
  }

  return (
    <div
      className={`star-rating${className ? ` ${className}` : ''}`}
      aria-label={`Rating ${rating} out of 5`}
    >
      {stars}
      <span className="star-rating__value">({rating})</span>
    </div>
  )
}

export default StarRating