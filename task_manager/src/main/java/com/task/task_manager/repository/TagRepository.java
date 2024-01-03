package com.task.task_manager.repository;

import com.task.task_manager.model.Tag;
import com.task.task_manager.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TagRepository extends JpaRepository<Tag, Long> {
    List<Tag> findAllByUser(User user);
}
