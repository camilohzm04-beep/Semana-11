import { useCart } from "../hooks/useCart";
import "../styles/main.css";

const CartWidget = ({ onClick }) => {
  const { cartCount } = useCart();

  return (
    <div className="cart-widget" onClick={onClick}>
      <span className="cart-widget__icon">🛒</span>
      {cartCount > 0 && <span className="cart-widget__count">{cartCount}</span>}
    </div>
  );
};

export default CartWidget;
