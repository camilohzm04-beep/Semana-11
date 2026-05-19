package com.relatosdepape.ms_books_catalogue.book;

import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;




public class BookSpecifications {

    public static Specification<Book> titleContains(String title) {
        return (root, query, cb) ->
                title == null ? null : cb.like(cb.lower(root.get("title")), "%" + title.toLowerCase() + "%");
    }

    public static Specification<Book> authorContains(String author) {
        return (root, query, cb) ->
                author == null ? null : cb.like(cb.lower(root.get("author")), "%" + author.toLowerCase() + "%");
    }

    public static Specification<Book> categoryEquals(String category) {
        return (root, query, cb) ->
                category == null ? null : cb.equal(cb.lower(root.get("category")), category.toLowerCase());
    }

    public static Specification<Book> isbnEquals(String isbn) {
        return (root, query, cb) ->
                isbn == null ? null : cb.equal(root.get("isbn"), isbn);
    }

    public static Specification<Book> ratingEquals(Integer rating) {
        return (root, query, cb) ->
                rating == null ? null : cb.equal(root.get("rating"), rating);
    }

    public static Specification<Book> visibleEquals(Boolean visible) {
        return (root, query, cb) ->
                visible == null ? null : cb.equal(root.get("visible"), visible);
    }

    public static Specification<Book> publicationDateEquals(LocalDate date) {
        return (root, query, cb) ->
                date == null ? null : cb.equal(root.get("publicationDate"), date);
    }
}
