package com.johnson.isaac.orders.models.BasketModels;

import java.io.Serializable;

public class BasketItem implements Serializable {
    private Item item;
    private int count = 1;

    public BasketItem() {}

    public BasketItem(Item item) {
        this.item = item;
    }

    public void add() {count++;}
    public void remove() {count--;}

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public float getTotal() {
        return item.getPrice() * count;
    }
}
