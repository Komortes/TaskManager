package com.task.task_manager.model;

import jakarta.persistence.*;
import com.task.task_manager.model.User; 

@Entity
@Table(name = "\"category\"")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long categoryId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = true)
    private String color;

    @Column(nullable = true)
    private String symbol;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private Boolean isSystem;

    public Category() {
    }

    public Category(String name, User user, String color, String symbol,  Boolean isSystem) {
        this.name = name;
        this.color = color;
        this.symbol = symbol;
        this.user = user;
        this.isSystem = isSystem;
    }

    public Long getId() {
        return categoryId;
    }

    public void setId(Long id) {
        this.categoryId = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Boolean getIsSystem() {
        return isSystem;
    }

    public void setIsSystem(Boolean isSystem) {
        this.isSystem = isSystem;
    }
}
