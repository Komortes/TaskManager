package com.task.task_manager.controller;

import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.task.task_manager.model.Category;
import com.task.task_manager.service.CategoryService;
import com.task.task_manager.dto.CategoryDto;
import com.task.task_manager.security.UserPrincipal;
import org.springframework.security.core.Authentication;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping
    public ResponseEntity<?> createCategory(@RequestBody CategoryDto categoryDto, Authentication authentication) {
        if (authentication != null) {
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            Long userId = userPrincipal.getId();
            Category category = categoryService.createCategory(categoryDto, userId);
            return ResponseEntity.ok(new CategoryDto(category)); 
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllCategories(Authentication authentication) {
        if (authentication != null) {
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            Long userId = userPrincipal.getId();
            List<CategoryDto> categoryDtos = categoryService.getAllCategoriesForUser(userId);
            return ResponseEntity.ok(categoryDtos);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id, Authentication authentication) {
        if (authentication != null) {
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            Long userId = userPrincipal.getId();
            boolean deleted = categoryService.deleteCategory(id, userId);
            if (deleted) {
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Category not found or not belong to the user or is system category");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCategory(@PathVariable Long id, @RequestBody CategoryDto categoryDto,
            Authentication authentication) {
        if (authentication != null) {
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            Long userId = userPrincipal.getId();
            Category updatedCategory = categoryService.updateCategory(id, categoryDto, userId);
            if (updatedCategory != null) {
                return ResponseEntity.ok(new CategoryDto(updatedCategory)); 
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Category not found or not belong to the user or is system category");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");
        }
    }
}
