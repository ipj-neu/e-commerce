package com.johnson.isaac.orders.models;

import com.johnson.isaac.orders.models.BasketModels.Basket;

import java.util.UUID;

public class OrderResponse {

    private UUID orderId;
    private String username;
    private Basket basket;
    private Card card;
    private String address;

    public OrderResponse() {}

    public OrderResponse(Order order, Basket basket) {
        this.orderId = order.getOrderId();
        this.username = order.getUsername();
        this.basket = basket;
        this.card = order.getCard();
        this.address = order.getAddress();
    }

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

    public Basket getBasket() {
        return basket;
    }

    public void setBasket(Basket basket) {
        this.basket = basket;
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
