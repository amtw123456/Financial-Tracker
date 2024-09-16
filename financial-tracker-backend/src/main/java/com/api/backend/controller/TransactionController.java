package com.api.backend.controller;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.api.backend.model.Transaction;
import com.api.backend.model.Users;
import com.api.backend.service.TransactionService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("transaction")
public class TransactionController {

    @Autowired
    private TransactionService service;

    @CrossOrigin
    @GetMapping("/getAll/{userId}")
    public ResponseEntity<List<Transaction>> getAllUserTransactions(@PathVariable Integer userId) {
        return service.getAllUserTransactions(userId);
    }

    @CrossOrigin
    @GetMapping("/getTransaction/{transactionId}")
    public ResponseEntity<Transaction> getTransaction(@PathVariable Integer transactionId) {
        return service.getTransactions(transactionId);
    }

    @PostMapping("/create/{userId}")
    public ResponseEntity<Transaction> createTransactions(@PathVariable Integer userId,
            @RequestBody Transaction transaction) {
        return service.createTransactions(userId, transaction);
    }

    @DeleteMapping("/delete/{transactionId}")
    public ResponseEntity<Transaction> deleteTransactions(@PathVariable Integer transactionId) {
        return service.deleteTransactions(transactionId);
    }

    @PutMapping("/update/{transactionId}")
    public ResponseEntity<Transaction> PutTransactions(@PathVariable Integer transactionId) {
        return service.updateTransactions(transactionId);
    }

}
