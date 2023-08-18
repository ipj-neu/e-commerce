package com.johnson.isaac.basket.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.keyvalue.core.mapping.BasicKeyValuePersistentEntity;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;
import java.util.*;

@RedisHash("Basket")
public class Basket implements Serializable {
    @Id
    private UUID basketId;
    private Map<UUID, BasketItem> items = new HashMap<>();

    public UUID getBasketId() {
        return basketId;
    }

    public void setBasketId(UUID basketId) {
        this.basketId = basketId;
    }

    public Map<UUID, BasketItem> getItems() {
        return items;
    }

    public void setItems(Map<UUID, BasketItem> items) {
        this.items = items;
    }

    public float getBasketTotal() {
        return (float) items.values().stream().mapToDouble(BasketItem::getTotal).sum();
    }

    public int getTotalItems() {
        return items.values().stream().mapToInt(BasketItem::getCount).sum();
    }
}
