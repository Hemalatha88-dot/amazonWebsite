import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import './ProductListingPage.css'

function NotFoundPage() {
  return (
    <div className="plp">
      <Header />
      <main className="plp__main">
        <div className="plp__container">
          <div className="plp__content-card">
            <h1 style={{ marginTop: 0 }}>Page not found</h1>
            <p>The page you are looking for does not exist.</p>
            <Link to="/" className="btn btn--primary">
              Back to Products
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default NotFoundPage
