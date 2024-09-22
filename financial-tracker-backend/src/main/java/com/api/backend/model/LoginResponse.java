package com.api.backend.model;

public class LoginResponse {
    private String jwtToken;
    private Integer userId;

    // Constructor
    public LoginResponse(String jwtToken, Integer userId) {
        this.jwtToken = jwtToken;
        this.userId = userId;
    }

    // Getters and Setters
    public String getJwtToken() {
        return jwtToken;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}