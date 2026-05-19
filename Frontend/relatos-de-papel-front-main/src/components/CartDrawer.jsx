import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import CartItem from "./CartItem";
import "../styles/main.css";

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <div className="cart-drawer-overlay" onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-drawer__header">
          <h2 className="heading-2">Tu Carrito</h2>
          <button className="cart-drawer__close" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="cart-drawer__content">
          {cart.length === 0 ? (
            <p className="cart-drawer__empty">No hay ningún producto.</p>
          ) : (
            <ul className="cart-drawer__list">
              {cart.map((item) => (
                <li key={item.id}>
                  <CartItem item={item} />
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-drawer__total">
              <span>Total:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <button
              className="btn btn--primary btn--block"
              onClick={handleCheckout}
            >
              Pagar
            </button>
            <button
              className="btn btn--secondary btn--block"
              onClick={clearCart}
              style={{ marginTop: "0.5rem" }}
            >
              Limpiar Carrito
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
