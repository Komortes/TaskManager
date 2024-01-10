package com.task.task_manager.repository;

import com.task.task_manager.model.Tag;
import com.task.task_manager.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, Long> {
    List<Tag> findAllByUser(User user);

    List<Tag> findAllByIsSystemTrue();

    @Query("SELECT t FROM Tag t LEFT JOIN FETCH t.user WHERE t.tagId = :tagId")
    Optional<Tag> findById(@Param("tagId") Long tagId);

}
