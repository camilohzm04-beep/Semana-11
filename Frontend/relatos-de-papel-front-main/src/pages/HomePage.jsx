import { useEffect, useState } from "react";
import { books as fallbackBooks } from "../data/books";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import { API_GATEWAY_URL, gatewayRequests, getBooks } from "../services/api";
import "../styles/main.css";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [gatewayStatus, setGatewayStatus] = useState({
    state: "loading",
    message: "Consultando catalogo por API Gateway...",
  });

  useEffect(() => {
    let isActive = true;

    const localBooks = fallbackBooks.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setGatewayStatus({
      state: "loading",
      message: "Consultando catalogo por API Gateway...",
    });

    getBooks({ title: searchTerm })
      .then((gatewayBooks) => {
        if (!isActive) return;

        if (gatewayBooks.length === 0) {
          setBooks(localBooks);
          setGatewayStatus({
            state: "empty",
            message:
              "Gateway conectado, pero el microservicio de catalogo no retorno libros. Se muestran datos locales.",
          });
          return;
        }

        setBooks(gatewayBooks);
        setGatewayStatus({
          state: "connected",
          message: "Catalogo cargado desde el microservicio via API Gateway.",
        });
      })
      .catch((error) => {
        if (!isActive) return;

        setBooks(localBooks);
        setGatewayStatus({
          state: "fallback",
          message: `${error.message}. Se muestran datos locales mientras levantas los microservicios.`,
        });
      });

    return () => {
      isActive = false;
    };
  }, [searchTerm]);

  return (
    <div className="home-page">
      <h1 className="heading-1">Catalogo de Libros</h1>
      <section
        className={`gateway-status gateway-status--${gatewayStatus.state}`}
        aria-live="polite"
      >
        <div>
          <strong>API Gateway</strong>
          <span>{API_GATEWAY_URL}</span>
        </div>
        <p>{gatewayStatus.message}</p>
        <ul>
          {gatewayRequests.map((request) => (
            <li key={`${request.method}-${request.url}`}>
              <span>{request.method}</span>
              <code>{request.url}</code>
            </li>
          ))}
        </ul>
      </section>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {books.length === 0 ? (
        <p className="home-page__no-results">No se encontraron libros.</p>
      ) : (
        <div className="grid">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
