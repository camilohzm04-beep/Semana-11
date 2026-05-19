import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import "../styles/main.css";

const BookCard = ({ book }) => {
  const { addToCart } = useCart();

  return (
    <div className="book-card">
      <Link to={`/book/${book.id}`} className="book-card__link">
        <div className="book-card__image-container">
          <img src={book.image} alt={book.title} className="book-card__image" />
        </div>
        <div className="book-card__content">
          <h3 className="book-card__title">{book.title}</h3>
          <p className="book-card__author">{book.author}</p>
          <p className="book-card__price">${book.price.toFixed(3)}</p>
        </div>
      </Link>
      <button
        className="btn btn--primary book-card__button"
        onClick={(e) => {
          e.preventDefault();
          addToCart(book);
        }}
      >
        Agregar al Carrito
      </button>
    </div>
  );
};

BookCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default BookCard;
