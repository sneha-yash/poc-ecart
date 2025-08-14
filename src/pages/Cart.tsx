import CartCard from "../components/CartCard";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateCartItemQuantity } from "../redux/slices/cart";
import type { CartItem } from "../interfaces/cart.type";
import HeaderComponent from "../components/Header";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";


// Demo Component with sample data
const Cart: React.FC = () => {
  const {items: cartItems, numberOfItems} = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleQuantityChange = (id: number, quantity: number) => {
    dispatch(updateCartItemQuantity({ id, quantity }))
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  // Use useMemo for totalPrice calculation
  const totalPrice = useMemo(
    () =>
      cartItems.reduce(
        (acc: number, item: CartItem) => acc + item.price * item.cartQuantity,
        0
      ),
    [cartItems]
  );

  return (
    <>
      <HeaderComponent cartItemCount={numberOfItems} title={'SHOPPING CART'} isClearCartVisible={true} />
    <div className="cart-container">
      <style>{`
        .cart-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 24px;
          font-family: 'Roboto', 'Arial', sans-serif;
          background: #f5f5f5;
          min-height: 100vh;
        }

        .cart-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
          padding: 16px 24px;
          background: linear-gradient(45deg, #1976d2, #42a5f5);
          color: white;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(25, 118, 210, 0.3);
        }

        .cart-title {
          font-size: 2rem;
          font-weight: 400;
          margin: 0;
          flex: 1;
        }

        .items-badge {
          background: white;
          color: #1976d2;
          padding: 4px 12px;
          border-radius: 16px;
          font-weight: bold;
          font-size: 0.875rem;
        }

        .cart-card {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          margin-bottom: 16px;
          transition: box-shadow 0.3s ease;
          overflow: hidden;
        }

        .cart-card:hover {
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        }

        .cart-content {
          padding: 16px;
        }

        .product-section {
          display: flex;
          gap: 16px;
          margin-bottom: 16px;
        }

        .image-container {
          flex-shrink: 0;
        }

        .product-image {
          width: 120px;
          height: 120px;
          object-fit: cover;
          border-radius: 8px;
          background: #f0f0f0;
        }

        .product-details {
          flex: 1;
        }

        .product-name {
          margin: 0 0 8px 0;
          font-size: 1.25rem;
          font-weight: 500;
          color: #333;
        }

        .product-description {
          margin: 0 0 12px 0;
          color: #666;
          font-size: 0.875rem;
          line-height: 1.4;
        }

        .price-container {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .current-price {
          font-size: 1.25rem;
          font-weight: bold;
          color: #1976d2;
        }

        .original-price {
          font-size: 0.875rem;
          color: #999;
          text-decoration: line-through;
        }

        .sale-badge {
          background: #f44336;
          color: white;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: bold;
        }

        .controls-section {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          border-top: 1px solid #e0e0e0;
          padding-top: 16px;
        }

        .quantity-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .quantity-label {
          font-size: 0.875rem;
          color: #666;
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          background: white;
        }

        .quantity-btn {
          background: none;
          border: none;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 1.125rem;
          color: #666;
          transition: background-color 0.2s;
        }

        .quantity-btn:hover:not(:disabled) {
          background: #f0f0f0;
        }

        .quantity-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .quantity-display {
          min-width: 40px;
          text-align: center;
          font-weight: 500;
          padding: 0 8px;
        }

        .total-section {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 12px;
        }

        .total-price {
          text-align: right;
        }

        .total-label {
          display: block;
          font-size: 0.875rem;
          color: #666;
          margin-bottom: 4px;
        }

        .total-amount {
          font-size: 1.5rem;
          font-weight: bold;
          color: #1976d2;
        }

        .remove-btn {
          background: #ffebee;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 1.125rem;
        }

        .remove-btn:hover {
          background: #f44336;
          transform: scale(1.05);
        }

        .empty-cart {
          text-align: center;
          padding: 64px 24px;
          color: #666;
        }

        .empty-cart-icon {
          font-size: 4rem;
          margin-bottom: 16px;
          opacity: 0.5;
        }

        .empty-cart-title {
          font-size: 1.5rem;
          margin-bottom: 8px;
          color: #333;
        }

        .cart-summary {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 24px;
          background: #f8f9fa;
          border-radius: 8px;
          margin-top: 24px;
        }

        .summary-total {
          font-size: 1.5rem;
          font-weight: bold;
          color: #333;
        }

        .checkout-btn {
          background: linear-gradient(45deg, #1976d2, #42a5f5);
          color: white;
          border: none;
          padding: 12px 32px;
          font-size: 1rem;
          font-weight: 500;
          border-radius: 24px;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 2px 8px rgba(25, 118, 210, 0.3);
        }

        .checkout-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(25, 118, 210, 0.4);
        }

        .divider {
          height: 1px;
          background: #e0e0e0;
          margin: 24px 0;
        }

        @media (max-width: 768px) {
          .product-section {
            flex-direction: column;
          }
          
          .controls-section {
            flex-direction: column;
            gap: 16px;
          }
          
          .total-section {
            align-items: center;
          }
          
          .cart-summary {
            flex-direction: column;
            gap: 16px;
          }
        }
      `}</style>

      {cartItems?.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2 className="empty-cart-title">Your cart is empty</h2>
          <p>Add some items to get started!</p>
        </div>
      ) : (
        <>
          {cartItems?.map((item: CartItem) => (
            <CartCard
              key={item.id}
              item={item}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemoveItem}
            />
          ))}

          <div className="divider"></div>

          {/* Cart Summary */}
          <div className="cart-summary">
            <div className="summary-total">
              Total: ₹{totalPrice.toFixed(2)}
            </div>
            <button className="checkout-btn" onClick={() => navigate('/track-order')}>
              🛒 Checkout
            </button>
          </div>
        </>
      )}
    </div>
    </>
  );
};

export default Cart;