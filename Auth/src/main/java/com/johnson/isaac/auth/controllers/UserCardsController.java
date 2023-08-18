package com.johnson.isaac.auth.controllers;

import com.johnson.isaac.auth.models.Card;
import com.johnson.isaac.auth.models.User;
import com.johnson.isaac.auth.repos.UserRepository;
import com.johnson.isaac.auth.util.JwtUtil;
import jakarta.ws.rs.Path;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/profile/card")
public class UserCardsController {

    @Autowired
    UserRepository userRepo;

    private boolean checkCard(Card card) {
        return card.getName() != null && card.getNumber() != null && card.getCcv() != 0 && card.getExp() != null;
    }

    @PostMapping("")
    public ResponseEntity<Void> addCard(@RequestHeader("Authorization") String token, @RequestBody Card card) {
        if (checkCard(card)) {
            String username = JwtUtil.getUser(token.substring(7));
            User user = userRepo.findUserByUsername(username);
            user.getCards().put(UUID.randomUUID(), card);
            userRepo.save(user);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        }
        return ResponseEntity.badRequest().build();
    }

    @PutMapping("/{cardId}")
    public ResponseEntity<Void> editCard(@RequestHeader("Authorization") String token, @PathVariable UUID cardId, @RequestBody Card newCard) {
        User user = userRepo.findUserByUsername(JwtUtil.getUser(token.substring(7)));
        if (user.getCards().containsKey(cardId)) {
            if (newCard.getName() != null) {
                user.getCards().get(cardId).setName(newCard.getName());
            }
            if (newCard.getNumber() != null) {
                user.getCards().get(cardId).setNumber(newCard.getNumber());
            }
            if (newCard.getCcv() != 0) {
                user.getCards().get(cardId).setCcv(newCard.getCcv());
            }
            if (newCard.getExp() != null) {
                user.getCards().get(cardId).setExp(newCard.getExp());
            }
            userRepo.save(user);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/{cardId}")
    public ResponseEntity<User> deleteCard(@RequestHeader("Authorization") String token, @PathVariable UUID cardId) {
        User user = userRepo.findUserByUsername(JwtUtil.getUser(token.substring(7)));
        if (user.getCards().containsKey(cardId)) {
            user.getCards().remove(cardId);
            userRepo.save(user);
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.badRequest().build();
    }
}
