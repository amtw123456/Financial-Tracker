package com.api.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.api.backend.model.Users;

public interface TransactionRepo extends JpaRepository<Users, Integer> {

}
