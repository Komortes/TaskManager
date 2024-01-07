package com.task.task_manager.repository;

import com.task.task_manager.model.Task;
import com.task.task_manager.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
        List<Task> findAllByUser(User user);

        List<Task> findAllByCalendarCalendarId(Long calendarId);

        @Query("SELECT t FROM Task t WHERE t.calendar.id = :calendarId " +
                        "AND EXTRACT(YEAR FROM t.dueDate) = :year " +
                        "AND EXTRACT(MONTH FROM t.dueDate) = :month")
        List<Task> findTasksByCalendarAndYearAndMonth(@Param("calendarId") Long calendarId,
                        @Param("year") int year,
                        @Param("month") int month);

}
