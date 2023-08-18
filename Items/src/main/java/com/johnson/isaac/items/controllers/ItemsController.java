package com.johnson.isaac.items.controllers;

import com.johnson.isaac.items.models.Item;
import com.johnson.isaac.items.repos.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@RestController
@RequestMapping("/item")
public class ItemsController {

    @Autowired
    private ItemRepository itemRepo;

    private Item getValidItem(UUID itemId) {
        return itemRepo.findById(itemId).orElse(null);
    }

    @PostMapping("")
    public ResponseEntity<Void> createItem(@RequestBody Item item) {
        if(item.getName() != null && item.getDescription() != null && item.getPrice() != 0.0 && item.getItemId() == null) {
            item.setItemId(UUID.randomUUID());
            itemRepo.save(item);
            return ResponseEntity.status(201).build();
        } else {
            return ResponseEntity.status(400).build();
        }
    }

    @PostMapping("/batch")
    public ResponseEntity<Void> createItems(@RequestBody List<Item> items) {
        for (Item item : items) {
            item.setItemId(UUID.randomUUID());
            itemRepo.save(item);
        }
        return ResponseEntity.status(201).build();
    }

    @GetMapping("")
    public ResponseEntity<List<Item>> findAllItems() {
        return new ResponseEntity<>(itemRepo.findAll(), HttpStatusCode.valueOf(200));
    }

    @GetMapping("/{itemId}")
    public ResponseEntity<Item> findItem(@PathVariable UUID itemId) {
        Item item = getValidItem(itemId);
        if (item != null) {
            return ResponseEntity.ok(item);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/search/{search}")
    public ResponseEntity<List<Item>> searchItems(@PathVariable String search) {
        return new ResponseEntity<>(itemRepo.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(search, search), HttpStatusCode.valueOf(200));
    }

    @GetMapping("/price/{min}/{max}")
    public ResponseEntity<List<Item>> filterPrice(@PathVariable float min, @PathVariable float max) {
        return new ResponseEntity<>(itemRepo.findByPriceGreaterThanAndPriceLessThan(min, max), HttpStatusCode.valueOf(200));
    }

    @PutMapping("/{itemId}")
    public ResponseEntity<Void> updateItem(@PathVariable UUID itemId, @RequestBody Item newItem) {
        Item item = getValidItem(itemId);
        if (item != null) {
            if (newItem.getName() != null) {
                item.setName(newItem.getName());
            }
            if (newItem.getDescription() != null) {
                item.setDescription(newItem.getDescription());
            }
            if (newItem.getPrice() != 0) {
                item.setPrice(newItem.getPrice());
            }
            itemRepo.save(item);
            return ResponseEntity.status(201).build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<Void> deleteItem(@PathVariable UUID itemId) {
        if (itemRepo.existsById(itemId)) {
            itemRepo.deleteById(itemId);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }
}
