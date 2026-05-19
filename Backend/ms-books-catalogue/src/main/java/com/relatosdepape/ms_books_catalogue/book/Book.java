package com.relatosdepape.ms_books_catalogue.book;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;

@Entity
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String title;

    @NotBlank
    private String author;

    private LocalDate publicationDate;

    private String category;

    @Column(unique = true)
    private String isbn;

    @Min(1)
    @Max(5)
    private Integer rating; // 1 a 5

    private Boolean visible = true;

    private Integer stock = 0;

    

    public Long getId() {
        return id;
    }



    public void setId(Long id) {
        this.id = id;
    }



    public String getTitle() {
        return title;
    }



    public void setTitle(String title) {
        this.title = title;
    }



    public String getAuthor() {
        return author;
    }



    public void setAuthor(String author) {
        this.author = author;
    }



    public LocalDate getPublicationDate() {
        return publicationDate;
    }



    public void setPublicationDate(LocalDate publicationDate) {
        this.publicationDate = publicationDate;
    }



    public String getCategory() {
        return category;
    }



    public void setCategory(String category) {
        this.category = category;
    }



    public String getIsbn() {
        return isbn;
    }



    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }



    public Integer getRating() {
        return rating;
    }



    public void setRating(Integer rating) {
        this.rating = rating;
    }



    public Boolean getVisible() {
        return visible;
    }



    public void setVisible(Boolean visible) {
        this.visible = visible;
    }



    public Integer getStock() {
        return stock;
    }



    public void setStock(Integer stock) {
        this.stock = stock;
    }



    public Book() {}
}