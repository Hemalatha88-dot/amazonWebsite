import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage'
import ProductDetailPage from './pages/ProductDetailPage'
import ProductListingPage from './pages/ProductListingPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductListingPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App