package com.johnson.isaac.basket.controllers;

import com.johnson.isaac.basket.models.Basket;
import com.johnson.isaac.basket.models.BasketItem;
import com.johnson.isaac.basket.models.Item;
import com.johnson.isaac.basket.repos.BasketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.keyvalue.core.mapping.BasicKeyValuePersistentEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/basket")
public class BasketController {

    // add a clear cart

    @Autowired
    BasketRepository basketRepo;

    public Basket getValidBasket(UUID basketId) {
        return basketRepo.findById(basketId).orElse(null);
    }

    @PostMapping("/{basketId}")
    public ResponseEntity<Basket> createBasket(@PathVariable String basketId, @RequestBody(required = false) Item item) {
        if(item.getItemId() != null && item.getName() != null && item.getDescription() != null && item.getPrice() != 0) {
            Basket basket;
            if (basketId.equals("new")) {
                basket = new Basket();
                basket.setBasketId(UUID.randomUUID());
                basket.getItems().put(item.getItemId(), new BasketItem(item));
                basketRepo.save(basket);
            } else {
                basket = getValidBasket(UUID.fromString(basketId));
                if (basket.getItems().containsKey(item.getItemId())) {
                    basket.getItems().get(item.getItemId()).add();
                } else {
                    basket.getItems().put(item.getItemId(), new BasketItem(item));
                }
                basketRepo.save(basket);
            }
            return ResponseEntity.ok(basket);
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/{basketId}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Basket> getBasket(@PathVariable UUID basketId) {
        Basket basket = getValidBasket(basketId);
        if (basket != null) {
            return ResponseEntity.ok(basket);
        }
        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/{basketId}/{itemId}")
    public ResponseEntity<Basket> deleteItemFromBasket(@PathVariable UUID basketId, @PathVariable UUID itemId) {
        Basket basket = getValidBasket(basketId);
        if (basket != null) {
            if (basket.getItems().containsKey(itemId)) {
                if (basket.getItems().get(itemId).getCount() > 1) {
                    basket.getItems().get(itemId).remove();
                } else {
                    basket.getItems().remove(itemId);
                }
                basketRepo.save(basket);
                return ResponseEntity.ok(basket);
            } else {
                return ResponseEntity.badRequest().build();
            }
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{basketId}")
    public ResponseEntity<Void> clearBasket(@PathVariable UUID basketId) {
        if (basketRepo.existsById(basketId)) {
            basketRepo.deleteById(basketId);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }
}