package com.johnson.isaac.auth.repos;

import com.johnson.isaac.auth.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.UUID;

public interface UserRepository extends MongoRepository<User, UUID> {
    User findUserByUsername(String username);
    Boolean existsByUsername(String username);
    void deleteUserByUsername(String username);
}
