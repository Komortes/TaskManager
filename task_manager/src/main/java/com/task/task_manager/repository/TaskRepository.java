package com.task.task_manager.repository;

import com.task.task_manager.model.Task;
import com.task.task_manager.model.User;
import com.task.task_manager.model.Category;
import com.task.task_manager.model.Tag;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
        List<Task> findAllByUser(User user);

        List<Task> findAllByCalendarCalendarId(Long calendarId);

        @Query("SELECT t FROM Task t LEFT JOIN t.tags tag " +
                        "WHERE t.calendar.id = :calendarId " +
                        "AND EXTRACT(YEAR FROM t.dueDate) = :year " +
                        "AND EXTRACT(MONTH FROM t.dueDate) = :month " +
                        "AND (:categoryId IS NULL OR t.category.id = :categoryId) " +
                        "AND (:tagId IS NULL OR tag.id = :tagId)")
        List<Task> findTasksByFilters(@Param("calendarId") Long calendarId,
                        @Param("year") int year,
                        @Param("month") int month,
                        @Param("categoryId") Long categoryId,
                        @Param("tagId") Long tagId);

        Task findAllByTaskId(Long taskId);

        List<Task> findAllByCategory(Category category);

        List<Task> findAllByTags(Tag tag);

}
