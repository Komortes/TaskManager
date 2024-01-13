package com.task.task_manager.service;

import com.task.task_manager.dto.CategoryDto;
import com.task.task_manager.model.Category;
import com.task.task_manager.model.User;
import com.task.task_manager.repository.CategoryRepository;
import com.task.task_manager.repository.TaskRepository;
import com.task.task_manager.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.util.List;
import java.util.Optional;
import java.util.ArrayList;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class CategoryServiceTest {

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private CategoryService categoryService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void shouldCreateCategory() {
        User user = new User();
        user.setId(1L);

        CategoryDto categoryDto = new CategoryDto(1L, "Category Name", "#FFFFFF", "emoji", false);
        Category category = new Category("Test Category", user, "#FFFFFF", "emoji", false);

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(categoryRepository.save(any(Category.class))).thenReturn(category);

        Category result = categoryService.createCategory(categoryDto, 1L);

        assertNotNull(result);
        assertEquals("Test Category", result.getName());
        assertEquals("#FFFFFF", result.getColor());
        assertEquals("emoji", result.getSymbol());
    }

    @Test
    void shouldGetAllCategoriesForUser() {
        User user = new User();
        user.setId(1L);

        List<Category> userCategories = new ArrayList<>();
        userCategories.add(new Category("User Category 1", user, "#FFFFFF", "emoji1", false));
        userCategories.add(new Category("User Category 2", user, "#000000", "emoji2", false));

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(categoryRepository.findByUserAndIsSystemFalse(user)).thenReturn(userCategories);

        List<CategoryDto> result = categoryService.getAllCategoriesForUser(1L);

        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("User Category 1", result.get(0).getName());
        assertEquals("User Category 2", result.get(1).getName());

    }

    @Test
    void shouldDeleteCategory() {
        User user = new User();
        user.setId(1L);
        Category category = new Category("Test Category", user, "#FFFFFF", "emoji", false);
        category.setId(1L);

        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(taskRepository.findAllByCategory(category)).thenReturn(new ArrayList<>());

        boolean result = categoryService.deleteCategory(1L, 1L);

        assertTrue(result);
        verify(categoryRepository, times(1)).delete(category);
    }

}
