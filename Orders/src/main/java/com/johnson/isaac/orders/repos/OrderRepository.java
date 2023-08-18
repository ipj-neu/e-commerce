package com.johnson.isaac.orders.repos;

import com.johnson.isaac.orders.models.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.UUID;

public interface OrderRepository extends MongoRepository<Order, UUID> {
    List<Order> getOrdersByUsername(String username);
}
