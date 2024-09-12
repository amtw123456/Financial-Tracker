package com.api.backend.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
public class HelloController {

    @CrossOrigin
    @RequestMapping("/hello")
    public String hello() {
        return "hello world!!!ss";
    }
}
