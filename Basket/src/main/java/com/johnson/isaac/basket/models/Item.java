package com.johnson.isaac.basket.models;

import org.springframework.data.annotation.Id;

import java.io.Serializable;
import java.util.UUID;

public class Item implements Serializable {
    @Id
    private UUID itemId;
    private String name;
    private String description;
    private float price;


    public UUID getItemId() {
        return itemId;
    }

    public void setItemId(UUID itemId) {
        this.itemId = itemId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }
}
