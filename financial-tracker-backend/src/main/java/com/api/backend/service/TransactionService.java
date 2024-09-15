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
        System.out.println(
                "redredredredredredredredredredredredredredredredredredredredredredredredredredredredredredredred");
        return new ResponseEntity<>(repo.findAllByTransactionUserId(userId), HttpStatus.OK);
    }

}
