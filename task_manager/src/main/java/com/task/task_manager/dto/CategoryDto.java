package com.task.task_manager.dto;

import com.task.task_manager.model.Category;

public class CategoryDto {
    private Long categoryId;
    private String name;
    private String color;
    private String symbol;
    private Boolean isSystem;  

    public CategoryDto(Category category) {
        this.categoryId = category.getId();
        this.name = category.getName();
        this.color = category.getColor();
        this.symbol = category.getSymbol();
    }

    public CategoryDto(Long id, String name, String color, String symbol, Boolean isSystem) {
        this.categoryId = id;
        this.name = name;
        this.color = color;
        this.symbol = symbol;
        this.isSystem = isSystem;
    }

    public Boolean getIsSystem() {
        return isSystem;
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
}
