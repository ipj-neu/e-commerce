package com.johnson.isaac.auth.controllers;

import com.johnson.isaac.auth.repos.UserRepository;
import com.johnson.isaac.auth.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.johnson.isaac.auth.models.User;
import org.springframework.web.server.ServerWebExchange;

import java.util.HashMap;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    UserRepository userRepository;

    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody User user) {
        if (user.getUsername() != null && user.getEmail() != null && user.getPassword() != null && user.getUserId() == null
                && user.getBasketId() == null && user.getAddress() != null) {
            if (!userRepository.existsByUsername(user.getUsername())) {
                user.setUserId(UUID.randomUUID());
                user.setBasketId("new");
                user.setCards(new HashMap<>());
                userRepository.save(user);
                String jwt = JwtUtil.generateToken(user);
                return ResponseEntity.status(HttpStatus.CREATED).body(jwt);
            } else {
                return ResponseEntity.status(HttpStatus.CONFLICT).build();
            }
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User login) {
        if (login.getUsername() != null && login.getPassword() != null) {
            if (userRepository.existsByUsername(login.getUsername())) {
                User user = userRepository.findUserByUsername(login.getUsername());
                if (user.getPassword().equals(login.getPassword())) {
                    String jwt = JwtUtil.generateToken(user);
                    return ResponseEntity.ok(jwt);
                }
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

}
