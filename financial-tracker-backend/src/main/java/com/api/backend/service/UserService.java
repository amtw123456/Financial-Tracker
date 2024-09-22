package com.api.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;

import com.api.backend.model.LoginResponse;
import com.api.backend.model.Users;
import com.api.backend.repository.UserRepo;

@Service
public class UserService {

    @Autowired
    private UserRepo repo;

    @Autowired
    private JWTService jwtService;

    @Autowired
    AuthenticationManager authManager;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public ResponseEntity<Users> register(Users user) {
        if (repo.findByUsername(user.getUsername()) != null) {
            return new ResponseEntity<>(user, HttpStatus.IM_USED);
        }
        user.setPassword(encoder.encode(user.getPassword()));
        return new ResponseEntity<>(repo.save(user), HttpStatus.OK);
    }

    public ResponseEntity<LoginResponse> verify(Users user) {
        Authentication authentication = authManager
                .authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        if (authentication.isAuthenticated()) {
            repo.findByUsername(user.getUsername());
            return new ResponseEntity<>(new LoginResponse(jwtService.generateToken(user.getUsername()),
                    repo.findByUsername(user.getUsername()).getId()), HttpStatus.OK);
        }
        return new ResponseEntity<>(new LoginResponse(null,
                null), HttpStatus.BAD_REQUEST);
    }

}
