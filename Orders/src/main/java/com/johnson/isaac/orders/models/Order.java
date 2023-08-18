package com.johnson.isaac.orders.models;

import org.springframework.data.annotation.Id;

import java.util.UUID;

public class Order {

    @Id
    private UUID orderId;
    private String username;
    private UUID basketId;
    private Card card;
    private String address;

    public UUID getOrderId() {
        return orderId;
    }

    public void setOrderId(UUID orderId) {
        this.orderId = orderId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public UUID getBasketId() {
        return basketId;
    }

    public void setBasketId(UUID basket) {
        this.basketId = basket;
    }

    public Card getCard() {
        return card;
    }

    public void setCard(Card card) {
        this.card = card;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
