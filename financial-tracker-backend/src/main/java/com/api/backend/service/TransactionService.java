package com.api.backend.service;

import java.util.List;

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
        return new ResponseEntity<>(repo.findByTransactionId(transactionId), HttpStatus.OK);
    }

    public ResponseEntity<Transaction> createTransactions(Integer userId, Transaction transaction) {
        repo.save(transaction);
        return new ResponseEntity<>(transaction, HttpStatus.OK);
    }

    public ResponseEntity<Transaction> deleteTransactions(Integer transactionId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteTransactions'");
    }

    public ResponseEntity<Transaction> updateTransactions(Integer transactionId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateTransactions'");
    }

}
