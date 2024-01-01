package com.task.task_manager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.task.task_manager.model.Calendar;
import com.task.task_manager.model.User;
import com.task.task_manager.repository.CalendarRepository;
import com.task.task_manager.repository.UserRepository;

@Service
public class CalendarService {

    @Autowired
    private CalendarRepository calendarRepository;

    @Autowired
    private UserRepository userRepository;

    public Calendar createCalendar(String name, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Calendar calendar = new Calendar(name, user);
        return calendarRepository.save(calendar);
    }
}
