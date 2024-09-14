package com.api.backend.controller;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.api.backend.model.Users;
import com.api.backend.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
public class UserController {

    @Autowired
    private UserService service;

    @CrossOrigin
    @PostMapping("/signup")
    public ResponseEntity<Users> register(@RequestBody Users user) {
        return service.register(user);
    }

    @CrossOrigin
    @PostMapping("/login")
    public String login(@RequestBody Users user) {
        return service.verify(user);
    }
}
