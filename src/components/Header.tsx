import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeaderProps, NavigationItem } from '../interfaces/header.type';
import { clearCart } from '../redux/slices/cart';
import { useDispatch } from 'react-redux';

const HeaderComponent: React.FC<HeaderProps> = ({
  title= 'Shop',
  isClearCartVisible=false,
  cartItemCount = 3,
  onCategoryClick,
  onNavigationClick
}) => {
  const [productsMenuOpen, setProductsMenuOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const productsButtonRef = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleProductsMenuToggle = (): void => {
    setProductsMenuOpen(!productsMenuOpen);
  };

  const handleMobileMenuToggle = (): void => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleCategoryClick = (category: string): void => {
    setProductsMenuOpen(false);
    if (onCategoryClick) {
      onCategoryClick(category);
    }
    console.log(`Category clicked: ${category}`);
  };

  const handleNavigationClick = (item: string, link: string): void => {
    if (isMobile) {
      setMobileMenuOpen(false);
    }
    if (onNavigationClick) {
      onNavigationClick(item);
    }
    navigate(link)
  };

  const handleCartClick = (): void => {
    navigate('/cart')
  };

  const productCategories: string[] = [
    'Electronics',
    'Clothing',
    'Home & Garden',
    'Books',
    'Sports',
    'Beauty'
  ];

  const navigationItems: NavigationItem[] = [
    { label: 'Home', icon: '🏠', link: '/'},
    { label: 'About', icon: 'ℹ️', link: '/about'},
    { label: 'Contact', icon: '📞', link: '/contact'}
  ];

  return (
    <>
      <style>{`
        .header {
          background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          position: sticky;
          top: 0;
          z-index: 1000;
        }
        
        .toolbar {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
          min-height: 64px;
        }
        
        .logo-section {
          display: flex;
          align-items: center;
          color: white;
          text-decoration: none;
        }
        
        .logo-icon {
          font-size: 24px;
          margin-right: 8px;
        }
        
        .logo-text {
          font-family: 'Roboto', 'Arial', sans-serif;
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 0.3rem;
          margin: 0;
        }
        
        .nav-desktop {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-grow: 1;
          margin-left: 32px;
        }
        
        .nav-button {
          background: none;
          border: none;
          color: white;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .nav-button:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-1px);
        }
        
        .mobile-menu-button {
          background: none;
          border: none;
          color: white;
          font-size: 24px;
          cursor: pointer;
          padding: 8px;
          border-radius: 4px;
          margin-right: 16px;
        }
        
        .mobile-menu-button:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        
        .cart-section {
          display: flex;
          align-items: center;
        }
        
        .cart-button {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          position: relative;
          transition: all 0.2s ease;
        }
        
        .cart-button:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: scale(1.1);
        }
        
        .cart-icon {
          font-size: 24px;
        }
        
        .cart-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: #f44336;
          color: white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: bold;
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        .products-menu {
          position: absolute;
          top: 100%;
          left: 0;
          background: white;
          border-radius: 8px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
          min-width: 200px;
          padding: 8px 0;
          z-index: 1001;
          margin-top: 8px;
          opacity: 0;
          transform: translateY(-10px);
          transition: all 0.3s ease;
        }
        
        .products-menu.open {
          opacity: 1;
          transform: translateY(0);
        }
        
        .menu-item {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          color: #333;
          text-decoration: none;
          cursor: pointer;
          transition: background-color 0.2s ease;
          gap: 12px;
        }
        
        .menu-item:hover {
          background-color: #f5f5f5;
        }
        
        .mobile-drawer {
          position: fixed;
          top: 0;
          left: 0;
          width: 280px;
          height: 100vh;
          background: white;
          box-shadow: 4px 0 20px rgba(0,0,0,0.15);
          transform: translateX(-100%);
          transition: transform 0.3s ease;
          z-index: 1002;
          overflow-y: auto;
        }
        
        .mobile-drawer.open {
          transform: translateX(0);
        }
        
        .mobile-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.5);
          z-index: 1001;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }
        
        .mobile-overlay.open {
          opacity: 1;
          visibility: visible;
        }
        
        .drawer-header {
          padding: 20px;
          border-bottom: 1px solid #e0e0e0;
          font-size: 18px;
          font-weight: bold;
          color: #333;
        }
        
        .drawer-item {
          display: flex;
          align-items: center;
          padding: 16px 20px;
          color: #333;
          cursor: pointer;
          transition: background-color 0.2s ease;
          gap: 16px;
        }
        
        .drawer-item:hover {
          background-color: #f5f5f5;
        }
        
        .drawer-divider {
          height: 1px;
          background: #e0e0e0;
          margin: 8px 0;
        }
        
        .drawer-category-header {
          padding: 16px 20px;
          font-weight: 600;
          color: #666;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .drawer-category {
          padding: 12px 40px;
          color: #555;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .drawer-category:hover {
          background-color: #f0f7ff;
          color: #1976d2;
        }
        
        .products-button-wrapper {
          position: relative;
        }
        
        @media (max-width: 767px) {
          .nav-desktop {
            display: none;
          }
          
          .logo-text {
            font-size: 18px;
            letter-spacing: 0.2rem;
          }
        }
        
        @media (min-width: 768px) {
          .mobile-menu-button {
            display: none;
          }
        }
      `}</style>

      <header className="header">
        <div className="toolbar">
          {/* Mobile menu button */}
          {isMobile && (
            <button
              className="mobile-menu-button"
              onClick={handleMobileMenuToggle}
              aria-label="Menu"
            >
              ☰
            </button>
          )}

          {/* Logo */}
          <div className="logo-section">
            <span className="logo-icon">🏪</span>
            <h1 className="logo-text">{title}</h1>
          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="nav-desktop">
              <button
                className="nav-button"
                onClick={() => handleNavigationClick('Home', '/')}
              >
                🏠 Products
              </button>
              
              {/* <div className="products-button-wrapper">
                <button
                  ref={productsButtonRef}
                  className="nav-button"
                  onClick={handleProductsMenuToggle}
                  aria-expanded={productsMenuOpen}
                  aria-haspopup="true"
                >
                  📦 Products ▼
                </button>
                
                <div className={`products-menu ${productsMenuOpen ? 'open' : ''}`}>
                  {productCategories.map((category: string, index: number) => (
                    <div
                      key={index}
                      className="menu-item"
                      onClick={() => handleCategoryClick(category)}
                    >
                      <span>📂</span>
                      <span>{category}</span>
                    </div>
                  ))}
                </div>
              </div> */}

              <button
                className="nav-button"
                onClick={() => handleNavigationClick('About', '/about')}
              >
                ℹ️ About
              </button>

              <button
                className="nav-button"
                onClick={() => handleNavigationClick('Contact', '/contact')}
              >
                📞 Contact
              </button>
            </nav>
          )}

          {/* Cart Button */}
          {isClearCartVisible && (
            <button className="checkout-btn" onClick={() => dispatch(clearCart())}>Clear Cart</button>
          )}

          <div className="cart-section">
            <button
              className="cart-button"
              onClick={handleCartClick}
              aria-label={`Shopping cart with ${cartItemCount} items`}
            >
              <span className="cart-icon">🛒</span>
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div 
        className={`mobile-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={handleMobileMenuToggle}
      />

      {/* Mobile Drawer */}
      <nav className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="drawer-header">Menu</div>
        
        {navigationItems.map((item: NavigationItem, index: number) => (
          <div
            key={index}
            className="drawer-item"
            onClick={() => handleNavigationClick(item.label, item.link)}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
        
        <div className="drawer-divider" />
        
        <div className="drawer-category-header">Categories</div>
        {productCategories.map((category: string, index: number) => (
          <div
            key={index}
            className="drawer-category"
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </div>
        ))}
      </nav>
    </>
  );
};

export default HeaderComponent;