import { Menu, Search, ShoppingCart, UserRound } from 'lucide-react'

const ICON_STROKE = 2
const HEADER_ICON_SIZE = 22

function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <button type="button" className="site-header__icon-btn" aria-label="Menu">
          <Menu
            className="site-header__lucide"
            size={HEADER_ICON_SIZE}
            strokeWidth={ICON_STROKE}
            aria-hidden="true"
          />
        </button>

        <div className="site-header__search">
          <span className="site-header__search-icon" aria-hidden="true">
            <Search size={18} strokeWidth={ICON_STROKE} />
          </span>
          <input
            type="search"
            className="site-header__search-input"
            placeholder="Search products..."
            disabled
            aria-label="Search products"
          />
        </div>

        <div className="site-header__actions" aria-label="Account actions">
          <button type="button" className="site-header__icon-btn" aria-label="Cart" disabled>
            <ShoppingCart
              className="site-header__lucide"
              size={HEADER_ICON_SIZE}
              strokeWidth={ICON_STROKE}
              aria-hidden="true"
            />
          </button>
          <button type="button" className="site-header__icon-btn" aria-label="Account" disabled>
            <UserRound
              className="site-header__lucide"
              size={HEADER_ICON_SIZE}
              strokeWidth={ICON_STROKE}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header