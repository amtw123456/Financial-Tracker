package com.api.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.api.backend.model.Transaction;

import jakarta.transaction.Transactional;
import java.util.Date;

@Repository
public interface TransactionRepo extends JpaRepository<Transaction, Integer> {

    List<Transaction> findAllByTransactionUserId(int userId);

    Transaction findByTransactionId(int transactionId);

    @Query("SELECT t FROM Transaction t WHERE t.transactionId IN :transactionIds")
    List<Transaction> findAllByTransactionId(@Param("transactionIds") List<Integer> transactionIds);

    @Modifying
    @Transactional
    @Query("DELETE FROM Transaction t WHERE t.transactionId IN :transactionIds")
    void deleteAllByTransactionId(@Param("transactionIds") List<Integer> transactionIds);

    @Query("SELECT t FROM Transaction t WHERE t.dateTimePosted >= :startDate AND t.dateTimePosted < :endDate ORDER BY t.transactionId ASC")
    List<Transaction> findByDateTimePostedBetween(
            @Param("userId") Integer userId,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate);

    @Query("SELECT t.expenseCategory, SUM(t.transactionAmount) " +
            "FROM Transaction t " +
            "WHERE t.userId = :userId AND t.dateTimePosted >= :startDate AND t.dateTimePosted < :endDate " +
            "GROUP BY t.expenseCategory " +
            "ORDER BY t.transactionId ASC")
    List<Object[]> findTransactionSumsByCategoryAndDateRange(
            @Param("userId") Integer userId,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate);

}
