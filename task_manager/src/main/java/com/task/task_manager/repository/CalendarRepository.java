package com.task.task_manager.repository;

import com.task.task_manager.model.Calendar;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CalendarRepository extends JpaRepository<Calendar, Long> {
   
}
