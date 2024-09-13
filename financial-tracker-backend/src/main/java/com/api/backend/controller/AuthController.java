package com.api.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.api.backend.service.JWTService;
import com.api.backend.service.MyUserDetailsService;

@RestController
public class AuthController {

    @Autowired
    private JWTService jwtService;

    @Autowired
    private MyUserDetailsService myUserDetailsService;

    @CrossOrigin
    @GetMapping("/isAuth")
    public boolean isLoggedIn(@RequestHeader("Authorization") String authHeader) {
        // Check if the Authorization header is present and starts with "Bearer "
        System.out.println(authHeader);
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7); // Extract the token
            String username = jwtService.extractUserName(token); // Extract the username from the token

            if (username != null) {
                // Load the user details using the extracted username
                UserDetails userDetails = myUserDetailsService.loadUserByUsername(username);

                // Validate the token with the user details
                return jwtService.validateToken(token, userDetails);
            }
        }
        return false; // Return false if the token is missing, invalid, or does not match the user
    }
}
