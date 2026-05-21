import { useEffect, useState } from "react";
import { books as fallbackBooks } from "../data/books";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import { getBooks } from "../services/api";
import "../styles/main.css";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [statusMessage, setStatusMessage] = useState("Cargando catalogo...");

  useEffect(() => {
    let isActive = true;
    const localBooks = fallbackBooks.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setStatusMessage("Consultando catalogo por API Gateway...");

    getBooks({ title: searchTerm })
      .then((gatewayBooks) => {
        if (!isActive) return;
        setBooks(gatewayBooks.length > 0 ? gatewayBooks : localBooks);
        setStatusMessage("Catalogo cargado desde el microservicio.");
      })
      .catch(() => {
        if (!isActive) return;
        setBooks(localBooks);
        setStatusMessage("Usando catalogo local. Levanta el Gateway para ver Fetch/XHR.");
      });

    return () => {
      isActive = false;
    };
  }, [searchTerm]);

  return (
    <div className="home-page">
      <h1 className="heading-1">Catalogo de Libros</h1>
      <p className="service-status">{statusMessage}</p>
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
