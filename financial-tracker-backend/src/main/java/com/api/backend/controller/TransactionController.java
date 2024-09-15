package com.api.backend.controller;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.api.backend.model.Transaction;
import com.api.backend.service.TransactionService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
public class TransactionController {

    @Autowired
    private TransactionService service;

    @CrossOrigin
    @GetMapping("/getTransactions/{userId}")
    public ResponseEntity<List<Transaction>> getAllUserTransactions(@PathVariable Integer userId) {
        return service.getAllUserTransactions(userId);
    }

}
