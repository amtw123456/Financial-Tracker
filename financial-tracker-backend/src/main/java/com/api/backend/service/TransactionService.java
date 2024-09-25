package com.api.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.api.backend.model.Transaction;
import com.api.backend.repository.TransactionRepo;

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

    public ResponseEntity<List<Transaction>> getSpecificTransaction(List<Integer> transactionId) {

        List<Transaction> transactions = repo.findAllByTransactionId(transactionId);

        return new ResponseEntity<>(transactions, HttpStatus.OK);

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
