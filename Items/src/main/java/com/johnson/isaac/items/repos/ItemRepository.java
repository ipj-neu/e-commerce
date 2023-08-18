package com.johnson.isaac.items.repos;

import com.johnson.isaac.items.models.Item;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.UUID;

public interface ItemRepository extends MongoRepository<Item, UUID> {
    List<Item> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String name, String desc);
    List<Item> findByPriceGreaterThanAndPriceLessThan(float min, float max);
}
