package com.api.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.api.backend.model.Transaction;

import jakarta.transaction.Transactional;

@Repository
public interface TransactionRepo extends JpaRepository<Transaction, Integer> {

    List<Transaction> findAllByTransactionUserId(int userId);

    @Query("SELECT t FROM Transaction t WHERE t.transactionId IN :transactionIds")
    List<Transaction> findAllByTransactionId(@Param("transactionIds") List<Integer> transactionIds);

    @Modifying
    @Transactional
    @Query("DELETE FROM Transaction t WHERE t.transactionId IN :transactionIds")
    void deleteAllByTransactionId(@Param("transactionIds") List<Integer> transactionIds);

    Transaction findByTransactionId(int transactionId);

}
