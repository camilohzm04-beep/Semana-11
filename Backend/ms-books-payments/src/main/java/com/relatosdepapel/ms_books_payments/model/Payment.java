package com.relatosdepapel.ms_books_payments.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
public class Payment {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private Long orderId;

  @Column(nullable = false, precision = 12, scale = 2)
  private BigDecimal amount;

  @Column(nullable = false)
  private String method;   // CARD, PSE, CASH

  @Column(nullable = false)
  private String status;   // PENDING, APPROVED, REJECTED

  @Column(nullable = false)
  private LocalDateTime createdAt = LocalDateTime.now();

public String getStatus() { return status; }
public void setStatus(String status) { this.status = status; }

public LocalDateTime getCreatedAt() { return createdAt; }
public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

public Long getId() { return id; }
public void setId(Long id) { this.id = id; }

public Long getOrderId() { return orderId; }
public void setOrderId(Long orderId) { this.orderId = orderId; }

public BigDecimal getAmount() { return amount; }
public void setAmount(BigDecimal amount) { this.amount = amount; }

public String getMethod() { return method; }
public void setMethod(String method) { this.method = method; }

  
}
