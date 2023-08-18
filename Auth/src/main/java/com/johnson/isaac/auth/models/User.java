package com.johnson.isaac.auth.models;

import org.springframework.data.annotation.Id;

import java.util.List;
import java.util.Map;
import java.util.UUID;

public class User {

    @Id
    private UUID userId;
    private String username;
    private String email;
    private String password;
    private String basketId;
    private Map<UUID, Card> cards;
    private String address;

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getBasketId() {
        return basketId;
    }

    public void setBasketId(String basketId) {
        this.basketId = basketId;
    }

    public Map<UUID, Card> getCards() {
        return cards;
    }

    public void setCards(Map<UUID, Card> cards) {
        this.cards = cards;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
