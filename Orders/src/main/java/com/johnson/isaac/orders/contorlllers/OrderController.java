package com.johnson.isaac.orders.contorlllers;

import com.johnson.isaac.orders.models.Card;
import com.johnson.isaac.orders.models.Order;
import com.johnson.isaac.orders.repos.OrderRepository;
import com.johnson.isaac.orders.models.OrderResponse;
import com.johnson.isaac.orders.models.BasketModels.Basket;
import com.johnson.isaac.orders.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    OrderRepository orderRepository;

    private OrderResponse convertOrder(Order order) {
        String host;
        if (System.getenv().containsKey("GATEWAY_SERVICE")) {
            host = System.getenv("GATEWAY_SERVICE");
        } else {
            host = "localhost";
        }

        String url = "http://" + host + ":8080/basket/" + order.getBasketId();

        RestTemplate rest = new RestTemplate();
        ResponseEntity<Basket> response = rest.getForEntity(url, Basket.class);

        // TODO: 4/22/2023 maybe add checks or throw error
        return new OrderResponse(order, response.getBody());
    }

    private boolean checkCard(Card card) {
        return card.getName() != null && card.getNumber() != null && card.getCcv() != 0 && card.getExp() != null;
    }

    @PostMapping("")
    public ResponseEntity<String> createOrder(@RequestBody Order order) {
        if (order.getUsername() != null && order.getBasketId() != null && checkCard(order.getCard()) && order.getAddress() != null) {
            order.setOrderId(UUID.randomUUID());
            orderRepository.save(order);
            return ResponseEntity.status(HttpStatus.CREATED).body(order.getOrderId().toString());
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderResponse> getOrderById(@RequestHeader("Authorization") String token, @PathVariable UUID orderId) {
        Optional<Order> orderOptional = orderRepository.findById(orderId);
        if (orderOptional.isPresent()) {
            Order order = orderOptional.get();
            if (order.getUsername().equals(JwtUtil.getUser(token.substring(7)))) {
                return ResponseEntity.ok(convertOrder(order));
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("")
    public ResponseEntity<List<OrderResponse>> getOrderForUser(@RequestHeader("Authorization") String token) {
        // this could maybe be optimized
        List<OrderResponse> response = new ArrayList<>();
        for (Order order : orderRepository.getOrdersByUsername(JwtUtil.getUser(token.substring(7)))) {
            response.add(convertOrder(order));
        }
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{orderId}")
    public ResponseEntity<Void> editOrder(@RequestHeader("Authorization") String token, @PathVariable UUID orderId, @RequestBody Order newOrder) {
        // no need to change the basket here because the basket service can handle it
        Optional<Order> orderOptional = orderRepository.findById(orderId);
        if (orderOptional.isPresent()) {
            Order order = orderOptional.get();
            if (order.getUsername().equals(JwtUtil.getUser(token.substring(7)))) {
                if (newOrder.getCard() != null) {
                    if (newOrder.getCard().getName() != null) {
                        order.getCard().setName(newOrder.getCard().getName());
                    }
                    if (newOrder.getCard().getNumber() != null) {
                        order.getCard().setNumber(newOrder.getCard().getNumber());
                    }
                    if (newOrder.getCard().getCcv() != 0) {
                        order.getCard().setCcv(newOrder.getCard().getCcv());
                    }
                    if (newOrder.getCard().getExp() != null) {
                        order.getCard().setExp(newOrder.getCard().getExp());
                    }
                    if (newOrder.getCard().getExp() != null) {
                        order.getCard().setExp(newOrder.getCard().getExp());
                    }
                }
                if (newOrder.getAddress() != null) {
                    order.setAddress(newOrder.getAddress());
                }
                orderRepository.save(order);
                return ResponseEntity.ok().build();
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/{orderId}")
    public ResponseEntity<Void> deleteOrder(@RequestHeader("Authorization") String token, @PathVariable UUID orderId) {
        Optional<Order> orderOptional = orderRepository.findById(orderId);
        if (orderOptional.isPresent()) {
            Order order = orderOptional.get();
            if (order.getUsername().equals(JwtUtil.getUser(token.substring(7)))) {
                orderRepository.delete(order);
                return ResponseEntity.ok().build();
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.badRequest().build();
    }

}
