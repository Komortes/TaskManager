package com.task.task_manager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.task.task_manager.model.Category;
import com.task.task_manager.model.User;
import com.task.task_manager.repository.CategoryRepository;
import com.task.task_manager.repository.TaskRepository;
import com.task.task_manager.repository.UserRepository;
import com.task.task_manager.dto.CategoryDto;
import com.task.task_manager.model.Task;
import java.util.List;
import java.util.stream.Collectors;
import java.util.ArrayList;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TaskRepository taskRepository;

    public Category createCategory(CategoryDto categoryDto, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Category category = new Category(categoryDto.getName(), user, categoryDto.getColor(), categoryDto.getSymbol(),
                false);
        return categoryRepository.save(category);
    }

    public List<CategoryDto> getAllCategoriesForUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        List<Category> systemCategories = categoryRepository.findByIsSystemTrue();
        List<Category> userCategories = categoryRepository.findByUserAndIsSystemFalse(user);
        List<Category> combinedCategories = new ArrayList<>(systemCategories);
        combinedCategories.addAll(userCategories);

        return combinedCategories.stream()
                .map(category -> new CategoryDto(category.getId(), category.getName(), category.getColor(),
                        category.getSymbol(), category.getIsSystem()))
                .collect(Collectors.toList());
    }

    public Category updateCategory(Long categoryId, CategoryDto categoryDto, Long userId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        if (!category.getIsSystem() && category.getUser().getId().equals(userId)) {
            category.setName(categoryDto.getName());
            category.setColor(categoryDto.getColor());
            category.setSymbol(categoryDto.getSymbol());
            return categoryRepository.save(category);
        } else {
            throw new IllegalArgumentException("Cannot update system category or category not belong to the user.");
        }
    }

    public boolean deleteCategory(Long categoryId, Long userId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
    
        if (category.getIsSystem() || !category.getUser().getId().equals(userId)) {
            return false;
        }
    
        List<Task> tasksWithCategory = taskRepository.findAllByCategory(category);
        for (Task task : tasksWithCategory) {
            task.setCategory(null);
            taskRepository.save(task);
        }
    
        categoryRepository.delete(category);
        return true;
    }
}
