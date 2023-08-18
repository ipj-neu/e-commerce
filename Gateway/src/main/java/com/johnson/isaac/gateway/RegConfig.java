package com.johnson.isaac.gateway;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RegConfig {
    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("item-service", r -> r.path("/item/**").uri("lb://item-service"))
                .route("basket-service", r -> r.path("/basket/**").uri("lb://basket-service"))
                .route("auth-service", r -> r.path("/auth/**").uri("lb://auth-service"))
                .route("auth-service", r -> r.path("/profile/**")
                        .filters(f -> f.filter(new JwtFilter()))
                        .uri("lb://auth-service"))
                .route("order-service", r -> r.path("/order/**")
                        .filters(f -> f.filter(new JwtFilter()))
                        .uri("lb://order-service"))
                .build();
    }
}
