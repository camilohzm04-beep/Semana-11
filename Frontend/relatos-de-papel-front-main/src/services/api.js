import { books as fallbackBooks } from "../data/books";

export const API_GATEWAY_URL =
  import.meta.env.VITE_API_GATEWAY_URL || "http://localhost:8080";

const CATALOGUE_PATH = "/api/catalogue/books";
const PAYMENTS_PATH = "/api/payments";

const fallbackByIsbn = new Map(fallbackBooks.map((book) => [book.isbn, book]));
const fallbackById = new Map(fallbackBooks.map((book) => [book.id, book]));

const request = async (path, options = {}) => {
  const response = await fetch(`${API_GATEWAY_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Gateway respondio ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

const buildBookDescription = (book) => {
  const details = [
    book.category ? `Categoria: ${book.category}` : null,
    book.rating ? `Calificacion: ${book.rating}/5` : null,
    Number.isFinite(book.stock) ? `Stock disponible: ${book.stock}` : null,
  ].filter(Boolean);

  return details.length
    ? details.join(". ")
    : "Libro disponible desde el microservicio de catalogo.";
};

export const normalizeBook = (book) => {
  const localMatch = fallbackByIsbn.get(book.isbn) || fallbackById.get(Number(book.id));

  return {
    id: Number(book.id),
    title: book.title || localMatch?.title || "Libro sin titulo",
    author: book.author || localMatch?.author || "Autor no registrado",
    price: Number(book.price ?? localMatch?.price ?? 50),
    image: book.image || localMatch?.image || "/book.svg",
    isbn: book.isbn || localMatch?.isbn || "N/A",
    description:
      book.description || localMatch?.description || buildBookDescription(book),
    category: book.category || localMatch?.category || "",
    rating: book.rating ?? localMatch?.rating ?? null,
    stock: book.stock ?? localMatch?.stock ?? null,
  };
};

export const getBooks = async ({ title } = {}) => {
  const params = new URLSearchParams({ visible: "true" });

  if (title?.trim()) {
    params.set("title", title.trim());
  }

  const books = await request(`${CATALOGUE_PATH}?${params.toString()}`);
  return books.map(normalizeBook);
};

export const getBookById = async (id) => {
  const book = await request(`${CATALOGUE_PATH}/${id}`);
  return normalizeBook(book);
};

export const createPayment = async ({ orderId, amount, method }) => {
  return request(PAYMENTS_PATH, {
    method: "POST",
    body: JSON.stringify({
      orderId,
      amount,
      method,
      status: "PENDING",
    }),
  });
};
