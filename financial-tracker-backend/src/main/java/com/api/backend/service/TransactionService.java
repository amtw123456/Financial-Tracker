package com.api.backend.service;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.List;
import java.util.Optional;

import org.hibernate.mapping.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.api.backend.model.Transaction;
import com.api.backend.repository.TransactionRepo;

import java.util.HashMap;
import java.util.ArrayList;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepo repo;

    public ResponseEntity<List<Transaction>> getAllUserTransactions(int userId) {
        return new ResponseEntity<>(repo.findAllByTransactionUserId(userId), HttpStatus.OK);
    }

    public ResponseEntity<Transaction> getTransactions(int transactionId) {

        Optional<Transaction> transaction = repo.findById(transactionId);
        System.out.println(transaction);

        if (transaction.isPresent()) {
            // Transaction found, return it with HTTP 200 OK
            return new ResponseEntity<>(transaction.get(), HttpStatus.OK);
        } else {
            // Transaction not found, return HTTP 404 Not Found
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<List<Transaction>> getTransactionsByDate(int userId, Date DateStart,
            Date DateEnd) {

        List<Transaction> transactions = repo.findByDateTimePostedBetween(userId, DateStart, DateEnd);

        return new ResponseEntity<>(transactions, HttpStatus.OK);

    }

    public ResponseEntity<List<HashMap<String, Object>>> getTransactionsByCategoryAndDate(int userId, Date dateStart,
            Date dateEnd) {

        List<Object[]> transactions = repo.findTransactionSumsByCategoryAndDateRange(userId, dateStart, dateEnd);

        // Create a list to store the transformed data
        List<HashMap<String, Object>> transactionsMap = new ArrayList<>();

        // Transform each Object[] into a Map<String, Object>
        for (Object[] transaction : transactions) {
            HashMap<String, Object> data = new HashMap<>();
            data.put("name", (String) transaction[0]); // Ensure it's a String
            data.put("value", ((Number) transaction[1]).intValue());

            transactionsMap.add(data);
        }

        return new ResponseEntity<>(transactionsMap, HttpStatus.OK);

    }

    public ResponseEntity<List<Transaction>> getSpecificTransaction(List<Integer> transactionId) {

        List<Transaction> transactions = repo.findAllByTransactionId(transactionId);

        return new ResponseEntity<>(transactions, HttpStatus.OK);

    }

    public List<Object[]> getMonthlyTransactionSummary(int userId) {
        List<Object[]> result = repo.getLastSixMonthsTransactionSummary(userId);

        return result;
    }

    public List<Object[]> getLast14DaysExpenses(int userId) {
        List<Object[]> result = repo.getLast14DaysExpenses(userId);
        return result;
    }

    public ResponseEntity<Transaction> createTransactions(Integer userId, Transaction transaction) {
        repo.save(transaction);
        return new ResponseEntity<>(transaction, HttpStatus.OK);
    }

    public ResponseEntity<Transaction> deleteTransaction(int transactionId) {
        Transaction transaction = repo.findByTransactionId(transactionId);
        repo.delete(transaction);
        return new ResponseEntity<>(transaction, HttpStatus.OK);
    }

    public ResponseEntity<List<Transaction>> deleteTransactionsByIds(List<Integer> transactionIds) {
        List<Transaction> transactions = repo.findAllByTransactionId(transactionIds);
        repo.deleteAllById(transactionIds);
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    public ResponseEntity<Transaction> updateTransaction(Integer transactionId, Transaction updatedTransaction) {
        Optional<Transaction> transactionOptional = repo.findById(transactionId);

        if (transactionOptional.isPresent()) {
            Transaction existingTransaction = transactionOptional.get();

            existingTransaction.setDateTimePosted(updatedTransaction.getDateTimePosted());
            existingTransaction.setTransactionDescription(updatedTransaction.getTransactionDescription());
            existingTransaction.setExpenseCategory(updatedTransaction.getExpenseCategory());
            existingTransaction.setTransactionAmount(updatedTransaction.getTransactionAmount());

            repo.save(existingTransaction);
            return ResponseEntity.ok(existingTransaction);
        } else {
            // Transaction not found
            return ResponseEntity.notFound().build();
        }
    }

}
