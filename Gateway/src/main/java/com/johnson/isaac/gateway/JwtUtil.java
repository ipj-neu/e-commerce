package com.johnson.isaac.gateway;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

public class JwtUtil {

    private static final String secret = "w9z$C&F)J@NcRfUjXnZr4u7x!A%D*G-KaPdSgVkYp3s5v8y/B?E(H+MbQeThWmZq4t7w9z$C&F)J@NcRfUjXn2r5u8x/A?D*G-KaPdSgVkYp3s6v9y$B&E)H+MbQeThWmZq4t7w!z%C*F-JaNcRfUjXn2r5u8x/A?D(G+KbPeSgVkYp3s6v9y$B&E)H@McQfTjWmZq4t7w!z%C*F-JaNdRgUkXp2r5u8x/A?D(G+KbPeShVmYq3t6v9y$B&E)H@M";

    private String token;
    private boolean isValid;
    private Claims body;

    public JwtUtil(String token) {
        // TODO: 4/14/2023 add checks for all the errors
        this.token = token;

        try {
            this.body = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
            this.isValid = true;
        } catch (Exception e) {
            this.isValid = false;
        }

    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public boolean isValid() {
        return isValid;
    }

    public void setValid(boolean valid) {
        isValid = valid;
    }

    public Claims getBody() {
        return body;
    }

    public void setBody(Claims body) {
        this.body = body;
    }
}
