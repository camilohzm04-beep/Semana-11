import { useCart } from '../hooks/useCart';
import '../styles/main.css';

const CartItem = ({ item }) => {
    const { removeFromCart } = useCart();

    return (
        <div className="cart-item">
            <img src={item.image} alt={item.title} className="cart-item__image" />
            <div className="cart-item__details">
                <h4 className="cart-item__title">{item.title}</h4>
                <p className="cart-item__price">${item.price.toFixed(2)} x {item.quantity}</p>
                <button
                    className="btn btn--danger cart-item__remove"
                    onClick={() => removeFromCart(item.id)}
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
};

export default CartItem;
