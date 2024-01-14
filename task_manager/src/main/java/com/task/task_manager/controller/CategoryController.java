package com.task.task_manager.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

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

/**
 * Controller for managing categories.
 */
@RestController
@RequestMapping("/api/categories")
@SecurityRequirement(name = "bearerAuth")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    /**
     * Creates a new category for the authenticated user.
     *
     * @param categoryDto    The category data to be created.
     * @param authentication The authentication information for the user.
     * @return ResponseEntity containing the created category.
     */
    @Operation(summary = "Create a new category", description = "Creates a new category for the authenticated user.")
    @ApiResponse(responseCode = "200", description = "Category created successfully")
    @ApiResponse(responseCode = "401", description = "Unauthorized")
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

    /**
     * Retrieves all categories for the authenticated user.
     *
     * @param authentication The authentication information for the user.
     * @return ResponseEntity containing a list of CategoryDto objects.
     */
    @Operation(summary = "Get all categories", description = "Retrieves all categories for the authenticated user.")
    @ApiResponse(responseCode = "200", description = "List of categories retrieved successfully")
    @ApiResponse(responseCode = "401", description = "Unauthorized")
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

    /**
     * Deletes a category for the authenticated user.
     *
     * @param id             The ID of the category to delete.
     * @param authentication The authentication information for the user.
     * @return ResponseEntity indicating the result of the deletion operation.
     */
    @Operation(summary = "Delete a category", description = "Deletes a category for the authenticated user.")
    @ApiResponse(responseCode = "200", description = "Category deleted successfully")
    @ApiResponse(responseCode = "401", description = "Unauthorized")
    @ApiResponse(responseCode = "404", description = "Category not found or not belong to the user")
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

    /**
     * Updates an existing category for the authenticated user.
     *
     * @param id             The ID of the category to update.
     * @param categoryDto    The updated category data.
     * @param authentication The authentication information for the user.
     * @return ResponseEntity containing the updated category.
     */
    @Operation(summary = "Update a category", description = "Updates an existing category for the authenticated user.")
    @ApiResponse(responseCode = "200", description = "Category updated successfully")
    @ApiResponse(responseCode = "401", description = "Unauthorized")
    @ApiResponse(responseCode = "404", description = "Category not found or not belong to the user")
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
