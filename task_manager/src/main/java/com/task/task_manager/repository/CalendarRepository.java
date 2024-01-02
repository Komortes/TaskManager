package com.task.task_manager.repository;

import com.task.task_manager.model.Calendar;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.task.task_manager.model.User;

public interface CalendarRepository extends JpaRepository<Calendar, Long> {
    List<Calendar> findAllByUser(User user);
}
