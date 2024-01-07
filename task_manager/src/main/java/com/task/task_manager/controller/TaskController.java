package com.task.task_manager.controller;

import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.task.task_manager.model.Task;
import com.task.task_manager.service.TaskService;
import com.task.task_manager.dto.TaskDto;
import com.task.task_manager.security.UserPrincipal;
import org.springframework.security.core.Authentication;
import com.task.task_manager.service.CalendarService;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private CalendarService calendarService;

    @PostMapping
    public ResponseEntity<?> createTask(@RequestBody TaskDto taskDto, Authentication authentication) {
        if (authentication != null) {
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            Long userId = userPrincipal.getId();
            Task task = taskService.createTask(taskDto, userId);
            return ResponseEntity.ok(task);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");
        }
    }

    @RequestMapping("/{calendarId}/tasks")
    public ResponseEntity<?> getTasksByCalendarAndMonth(
            @PathVariable Long calendarId,
            @RequestParam int year,
            @RequestParam int month,
            Authentication authentication) {
        
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");
        }

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Long userId = userPrincipal.getId();
        
        if (!calendarService.doesCalendarBelongToUser(calendarId, userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access to the requested calendar is forbidden");
        }
        
        List<TaskDto> taskDtos = taskService.getTasksByCalendarAndMonth(calendarId, year, month);
        return ResponseEntity.ok(taskDtos);
    }

}
