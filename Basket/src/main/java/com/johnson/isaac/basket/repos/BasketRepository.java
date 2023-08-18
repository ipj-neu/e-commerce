package com.johnson.isaac.basket.repos;

import com.johnson.isaac.basket.models.Basket;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface BasketRepository extends CrudRepository<Basket, UUID> {
}
