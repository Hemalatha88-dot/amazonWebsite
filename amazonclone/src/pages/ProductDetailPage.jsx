import { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import ErrorState from '../components/common/ErrorState'
import LoadingState from '../components/common/LoadingState'
import StarRating from '../components/common/StarRating'
import Header from '../components/layout/Header'
import { fetchProductById } from '../services/productsApi'
import './ProductDetailPage.css'

function BackButton({ onBack }) {
  return (
    <p className="pdp__back-wrap">
      <button type="button" className="pdp__back" onClick={onBack}>
        <ArrowLeft size={18} strokeWidth={2} aria-hidden="true" />
        Back
      </button>
    </p>
  )
}

function ProductDetailView({ productId, onBack }) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    fetchProductById(productId)
      .then((data) => {
        if (cancelled) return
        setProduct(data)
        setError(null)
      })
      .catch((err) => {
        if (cancelled) return
        setProduct(null)
        setError(err.message || 'Unable to load this product.')
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [productId])

  const mainImage =
    product?.thumbnail || product?.images?.[0] || product?.image || ''

  if (loading) {
    return (
      <div className="pdp__content-card">
        <BackButton onBack={onBack} />
        <LoadingState message="Loading product details…" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="pdp__state-card">
        <BackButton onBack={onBack} />
        <ErrorState
          message={error}
          onRetry={() => window.location.reload()}
        />
        <Link to="/" className="btn btn--outline pdp__back-link">
          Back to Products
        </Link>
      </div>
    )
  }

  if (!product) {
    return null
  }

  return (
    <div className="pdp__content-card">
      <BackButton onBack={onBack} />

      <div className="pdp__layout">
        <div className="pdp__media">
          <div className="pdp__image-wrap">
            <img src={mainImage} alt={product.title} className="pdp__image" />
          </div>
        </div>

        <div className="pdp__info">
          <h1 className="pdp__title">{product.title}</h1>
          <p className="pdp__price">${product.price}</p>
          <StarRating
            rating={product.rating}
            size={18}
            className="pdp__rating"
          />

          <dl className="pdp__meta">
            {product.brand && (
              <>
                <dt>Brand</dt>
                <dd>{product.brand}</dd>
              </>
            )}
            {product.category && (
              <>
                <dt>Category</dt>
                <dd className="pdp__meta-capitalize">{product.category}</dd>
              </>
            )}
          </dl>

          {product.description && (
            <section className="pdp__section">
              <h2 className="pdp__section-title">Description</h2>
              <p className="pdp__description">{product.description}</p>
            </section>
          )}

          {Array.isArray(product.reviews) && product.reviews.length > 0 && (
            <section className="pdp__section">
              <h2 className="pdp__section-title">Reviews</h2>
              <ul className="pdp__reviews">
                {product.reviews.map((review, index) => (
                  <li
                    key={
                      review.reviewerEmail ||
                      `${review.reviewerName}-${review.rating}-${index}`
                    }
                  >
                    <p className="pdp__reviewer">{review.reviewerName}</p>
                    <StarRating
                      rating={review.rating}
                      size={14}
                      className="pdp__review-rating"
                    />
                    <p className="pdp__review-comment">{review.comment}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

function ProductDetailPage() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const backTo =
    typeof location.state?.from === 'string' ? location.state.from : '/'

  const handleBack = () => {
    navigate(backTo)
  }

  return (
    <div className="pdp">
      <Header />

      <main className="pdp__main">
        <div className="pdp__container">
          <ProductDetailView key={id} productId={id} onBack={handleBack} />
        </div>
      </main>
    </div>
  )
}

export default ProductDetailPage