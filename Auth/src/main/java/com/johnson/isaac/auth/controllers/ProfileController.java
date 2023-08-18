package com.johnson.isaac.auth.controllers;

import com.johnson.isaac.auth.repos.UserRepository;
import com.johnson.isaac.auth.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.johnson.isaac.auth.models.User;

@RestController
@RequestMapping("/profile")
public class ProfileController {

    @Autowired
    UserRepository userRepo;

    @GetMapping("")
    public ResponseEntity<User> getUserProfile(@RequestHeader("Authorization") String token) {
        User user = userRepo.findUserByUsername(JwtUtil.getUser(token.substring(7)));
        user.setPassword("");
        return ResponseEntity.ok(user);
    }

    @PutMapping("")
    public ResponseEntity<Void> editUser(@RequestHeader("Authorization") String token, @RequestBody User newUser) {
        User user = userRepo.findUserByUsername(JwtUtil.getUser(token.substring(7)));
        if (newUser.getEmail() != null) {
            user.setEmail(newUser.getEmail());
        }
        if (newUser.getAddress() != null) {
            user.setAddress(newUser.getAddress());
        }
        if (newUser.getPassword() != null) {
            user.setPassword(newUser.getPassword());
        }
        userRepo.save(user);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("")
    public ResponseEntity<Void> deleteUser(@RequestHeader("Authorization") String token) {
        userRepo.deleteUserByUsername(JwtUtil.getUser(token.substring(7)));
        return ResponseEntity.ok().build();
    }

}
