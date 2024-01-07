package com.task.task_manager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.task.task_manager.model.Calendar;
import com.task.task_manager.model.User;
import com.task.task_manager.repository.CalendarRepository;
import com.task.task_manager.repository.UserRepository;
import com.task.task_manager.dto.CalendarDto;
import java.util.List;
import java.util.stream.Collectors;

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

    public boolean deleteCalendar(Long calendarId, Long userId) {
        Calendar calendar = calendarRepository.findById(calendarId).orElse(null);
        if (calendar != null && calendar.getUser().getId().equals(userId)) {
            calendarRepository.delete(calendar);
            return true;
        } else {
            return false;
        }
    }

    public List<CalendarDto> getAllCalendarsForUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        List<Calendar> calendars = calendarRepository.findAllByUser(user);
        return calendars.stream()
                .map(CalendarDto::new)
                .collect(Collectors.toList());
    }

    public Calendar updateCalendar(Long calendarId, String newName, Long userId) {
        Calendar calendar = calendarRepository.findById(calendarId).orElse(null);
        if (calendar != null && calendar.getUser().getId().equals(userId)) {
            calendar.setName(newName);
            return calendarRepository.save(calendar);
        } else {
            return null;
        }
    }

    public boolean doesCalendarBelongToUser(Long calendarId, Long userId) {
        return calendarRepository.findById(calendarId)
                .map(Calendar::getUser)
                .map(user -> user.getId().equals(userId))
                .orElse(false);
    }

}
