package com.johnson.isaac.auth.models;

import org.springframework.data.annotation.Id;

import java.util.UUID;

public class Card {

    private String name;
    private String number;
    private int ccv;
    private String exp;

    public Card() {}

    public Card(String name, String number, int ccv, String exp) {
        this.name = name;
        this.number = number;
        this.ccv = ccv;
        this.exp = exp;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public int getCcv() {
        return ccv;
    }

    public void setCcv(int ccv) {
        this.ccv = ccv;
    }

    public String getExp() {
        return exp;
    }

    public void setExp(String exp) {
        this.exp = exp;
    }
}
