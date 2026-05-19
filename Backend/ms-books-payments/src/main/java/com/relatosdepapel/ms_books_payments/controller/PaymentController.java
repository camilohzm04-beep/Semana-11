package com.relatosdepapel.ms_books_payments.controller;

import com.relatosdepapel.ms_books_payments.model.Payment;
import com.relatosdepapel.ms_books_payments.service.PaymentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/payments")
public class PaymentController {

  private final PaymentService service;

  public PaymentController(PaymentService service) {
    this.service = service;
  }

  @PostMapping
  public ResponseEntity<Payment> create(@RequestBody Payment p) {
    return ResponseEntity.status(HttpStatus.CREATED).body(service.create(p));
  }

@GetMapping
  public List<Payment> getAll() {
    return service.getAll();
  }


  @GetMapping("/order/{orderId}")
  public List<Payment> byOrder(@PathVariable Long orderId) {
    return service.byOrder(orderId);
  }

  @PatchMapping("/{id}/approve")
  public Payment approve(@PathVariable Long id) {
    return service.approve(id);
  }

  @PatchMapping("/{id}/reject")
  public Payment reject(@PathVariable Long id) {
    return service.reject(id);
  }
}
