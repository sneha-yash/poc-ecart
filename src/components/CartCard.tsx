import React from "react";
import { RemoveCartButton } from "./Buttons";
import type { CartCardProps } from "../interfaces/cart.type";

const CartCard: React.FC<CartCardProps> = ({
  item,
  onQuantityChange,
  onRemove,
}) => {
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 0 && onQuantityChange) {
      onQuantityChange(item.id, newQuantity);
    }
  };

  const totalPrice = item.price * item.cartQuantity;
  const hasDiscount = item.originalPrice && item.originalPrice > item.price;

  return (
    <div className="cart-card">
      <div className="cart-content">
        <div className="product-section">
          {/* Product Image */}
          <div className="image-container">
            <img
              src={item.images?.[0]}
              alt={item.title}
              className="product-image"
            />
          </div>

          {/* Product Details */}
          <div className="product-details">
            <h3 className="product-name">{item.title}</h3>
            {item.slug && <p className="product-description">{item.slug}</p>}

            {/* Price Display */}
            <div className="price-container">
              <span className="current-price">₹ {item.price.toFixed(2)}</span>
              {hasDiscount && (
                <>
                  <span className="original-price">
                    ₹ {item.originalPrice!.toFixed(2)}
                  </span>
                  <span className="sale-badge">SALE</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="controls-section">
          {/* Quantity Controls */}
          {onQuantityChange && (
            <div className="quantity-section">
              <span className="quantity-label">Quantity</span>
              <div className="quantity-controls">
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(item.cartQuantity - 1)}
                  disabled={item.cartQuantity <= 1}
                >
                  −
                </button>

                <span className="quantity-display">{item.cartQuantity}</span>

                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(item.cartQuantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Total Price and Actions */}
          <div className="total-section">
            <div className="total-price">
              <span className="total-label">Total</span>
              <span className="total-amount">₹{totalPrice.toFixed(2)}</span>
            </div>
            {onRemove && (
              <RemoveCartButton
                onClick={() => onRemove(item.id)}
                title="Remove item"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
