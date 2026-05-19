package com.relatosdepapel.ms_books_payments.repository;

import com.relatosdepapel.ms_books_payments.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByOrderId(Long orderId);
}