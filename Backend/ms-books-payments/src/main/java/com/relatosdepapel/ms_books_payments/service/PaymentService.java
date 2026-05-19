package com.relatosdepapel.ms_books_payments.service;

import com.relatosdepapel.ms_books_payments.model.Payment;
import com.relatosdepapel.ms_books_payments.repository.PaymentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


@Service
public class PaymentService {

  private final PaymentRepository repo;

  public PaymentService(PaymentRepository repo) {
    this.repo = repo;
  }

  public Payment create(Payment p) {
    p.setStatus("PENDING");
    p.setCreatedAt(LocalDateTime.now());
    return repo.save(p);
  }

  public List<Payment> byOrder(Long orderId) {
    return repo.findByOrderId(orderId);
  }

  public Payment approve(Long id) {
    Payment p = repo.findById(id).orElseThrow();
    p.setStatus("APPROVED");
    return repo.save(p);
  }

  public Payment reject(Long id) {
    Payment p = repo.findById(id).orElseThrow();
    p.setStatus("REJECTED");
    return repo.save(p);
  }

  public List<Payment> getAll() {
    return repo.findAll();
}
}
