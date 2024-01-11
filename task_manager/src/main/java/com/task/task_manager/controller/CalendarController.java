package com.task.task_manager.controller;

import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.task.task_manager.model.Calendar;
import com.task.task_manager.repository.TaskRepository;
import com.task.task_manager.service.CalendarService;
import com.task.task_manager.dto.CalendarDto;
import com.task.task_manager.security.UserPrincipal;
import org.springframework.security.core.Authentication;
import java.util.List;

@RestController
@RequestMapping("/api/calendars")
public class CalendarController {

    @Autowired
    private CalendarService calendarService;

        @Autowired
    private TaskRepository taskRepository;


    @PostMapping
    public ResponseEntity<?> createCalendar(@RequestBody CalendarDto calendarDto, Authentication authentication) {
        if (authentication != null) {
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            Long userId = userPrincipal.getId();
            Calendar calendar = calendarService.createCalendar(calendarDto.getName(), userId);
            return ResponseEntity.ok(calendar);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllCalendars(Authentication authentication) {
        if (authentication != null) {
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            Long userId = userPrincipal.getId();
            List<CalendarDto> calendarDtos = calendarService.getAllCalendarsForUser(userId); 
            return ResponseEntity.ok(calendarDtos);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");
        }
    }
    

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCalendar(@PathVariable Long id, Authentication authentication) {
        if (authentication != null) {
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            Long userId = userPrincipal.getId();
            boolean deleted = calendarService.deleteCalendar(id, userId);
            if (deleted) {
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Calendar not found or not belong to the user");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCalendar(@PathVariable Long id, @RequestBody CalendarDto calendarDto,
            Authentication authentication) {
        if (authentication != null) {
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            Long userId = userPrincipal.getId();
            Calendar updatedCalendar = calendarService.updateCalendar(id, calendarDto.getName(), userId);
            if (updatedCalendar != null) {
                return ResponseEntity.ok(updatedCalendar);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Calendar not found or not belong to the user");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");
        }
    }

}
