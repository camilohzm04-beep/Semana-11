package com.relatosdepape.ms_books_catalogue.book;

import jakarta.validation.Valid;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;



import java.time.LocalDate;
import java.util.List;

import static com.relatosdepape.ms_books_catalogue.book.BookSpecifications.*;

@RestController
@RequestMapping("/books")
public class BookController {

    private final BookRepository repository;

    public BookController(BookRepository repository) {
        this.repository = repository;
    }

    // Crear libro
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Book create(@Valid @RequestBody Book book) {
        return repository.save(book);
    }

    // Obtener libro por ID
    @GetMapping("/{id}")
    public Book getById(@PathVariable Long id) {
        return repository.findById(id)
        .orElseThrow(() -> new RuntimeException("Libro no encontrado"));


    }

    // Búsqueda combinada (LO QUE MÁS PUNTÚA)
    @GetMapping
    public List<Book> search(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String author,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String isbn,
            @RequestParam(required = false) Integer rating,
            @RequestParam(required = false) Boolean visible,
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate publicationDate
    ) {

        Specification<Book> spec = Specification
                .where(titleContains(title))
                .and(authorContains(author))
                .and(categoryEquals(category))
                .and(isbnEquals(isbn))
                .and(ratingEquals(rating))
                .and(visibleEquals(visible))
                .and(publicationDateEquals(publicationDate));

        return repository.findAll(spec);
    }

    // Eliminar libro
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
