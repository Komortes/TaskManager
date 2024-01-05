package com.task.task_manager.repository;

import com.task.task_manager.model.Category;
import com.task.task_manager.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    List<Category> findByUserAndIsSystemFalse(User user);
    List<Category> findByIsSystemTrue();
}
