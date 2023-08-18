package com.johnson.isaac.orders.models.BasketModels;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class Basket implements Serializable {
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
