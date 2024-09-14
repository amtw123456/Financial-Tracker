package com.api.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.backend.repository.TransactionRepo;

@Service
public class TransactionService {
    @Autowired
    private TransactionRepo repo;

    
}
