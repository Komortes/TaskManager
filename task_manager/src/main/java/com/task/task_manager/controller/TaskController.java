package com.task.task_manager.controller;

import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.task.task_manager.model.Task;
import com.task.task_manager.service.TaskService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

import com.task.task_manager.dto.TaskDto;
import com.task.task_manager.security.UserPrincipal;
import org.springframework.security.core.Authentication;
import com.task.task_manager.service.CalendarService;
import java.util.List;

/**
 * Controller for managing tasks.
 */
@RestController
@RequestMapping("/api/tasks")
@SecurityRequirement(name = "bearerAuth")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private CalendarService calendarService;

    /**
     * Creates a new task for the authenticated user.
     *
     * @param taskDto        The task data to be created.
     * @param authentication The authentication information for the user.
     * @return ResponseEntity containing the created task.
     */
    @Operation(summary = "Create a new task", description = "Creates a new task for the authenticated user.")
    @ApiResponse(responseCode = "200", description = "Task created successfully")
    @ApiResponse(responseCode = "401", description = "Unauthorized")
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

    /**
     * Retrieves tasks for a specified calendar and month for the authenticated
     * user.
     *
     * @param calendarId     The ID of the calendar.
     * @param year           The year for which tasks are requested.
     * @param month          The month for which tasks are requested.
     * @param category       (Optional) The category filter for tasks.
     * @param tag            (Optional) The tag filter for tasks.
     * @param authentication The authentication information for the user.
     * @return ResponseEntity containing a list of TaskDto objects.
     */
    @Operation(summary = "Get tasks by calendar and month", description = "Retrieves tasks for a specified calendar and month for the authenticated user.")
    @ApiResponse(responseCode = "200", description = "Tasks retrieved successfully")
    @ApiResponse(responseCode = "401", description = "Unauthorized")
    @ApiResponse(responseCode = "403", description = "Forbidden")
    @GetMapping("/{calendarId}/tasks")
    public ResponseEntity<?> getTasksByCalendarAndMonth(
            @PathVariable Long calendarId,
            @RequestParam int year,
            @RequestParam int month,
            @RequestParam(required = false) Long category,
            @RequestParam(required = false) Long tag,
            Authentication authentication) {

        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");
        }

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Long userId = userPrincipal.getId();

        if (!calendarService.doesCalendarBelongToUser(calendarId, userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access to the requested calendar is forbidden");
        }

        List<TaskDto> taskDtos = taskService.getTasksByCalendarAndMonth(calendarId, year, month, category, tag);
        return ResponseEntity.ok(taskDtos);
    }

    /**
     * Retrieves information for a specific task within a calendar for the
     * authenticated user.
     *
     * @param calendarId     The ID of the calendar containing the task.
     * @param taskId         The ID of the task to retrieve.
     * @param authentication The authentication information for the user.
     * @return ResponseEntity containing the TaskDto for the specified task.
     */
    @Operation(summary = "Get task info", description = "Retrieves information for a specific task within a calendar for the authenticated user.")
    @ApiResponse(responseCode = "200", description = "Task info retrieved successfully")
    @ApiResponse(responseCode = "401", description = "Unauthorized")
    @ApiResponse(responseCode = "403", description = "Forbidden")
    @GetMapping("/{calendarId}/{taskId}")
    public ResponseEntity<?> getTaskInfo(
            @PathVariable Long calendarId,
            @PathVariable Long taskId,
            Authentication authentication) {

        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");
        }

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Long userId = userPrincipal.getId();

        if (!calendarService.doesCalendarBelongToUser(calendarId, userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access to the requested calendar is forbidden");
        }

        TaskDto taskDtos = taskService.getTasksById(taskId);
        return ResponseEntity.ok(taskDtos);
    }

    /**
     * Deletes a task for the authenticated user.
     *
     * @param taskId         The ID of the task to delete.
     * @param authentication The authentication information for the user.
     * @return ResponseEntity indicating the result of the deletion operation.
     */
    @Operation(summary = "Delete a task", description = "Deletes a task for the authenticated user.")
    @ApiResponse(responseCode = "200", description = "Task deleted successfully")
    @ApiResponse(responseCode = "401", description = "Unauthorized")
    @ApiResponse(responseCode = "403", description = "Forbidden")
    @DeleteMapping("/{taskId}")
    public ResponseEntity<?> deleteTask(@PathVariable Long taskId, Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");
        }

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Long userId = userPrincipal.getId();

        if (taskService.deleteTask(taskId, userId)) {
            return ResponseEntity.ok("Task successfully deleted");
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied or task not found");
        }
    }

    /**
     * Updates an existing task for the authenticated user.
     *
     * @param taskId         The ID of the task to update.
     * @param taskDto        The updated task data.
     * @param authentication The authentication information for the user.
     * @return ResponseEntity containing the updated task.
     */
    @Operation(summary = "Update a task", description = "Updates an existing task for the authenticated user.")
    @ApiResponse(responseCode = "200", description = "Task updated successfully")
    @ApiResponse(responseCode = "401", description = "Unauthorized")
    @ApiResponse(responseCode = "403", description = "Forbidden")
    @PutMapping("/{taskId}")
    public ResponseEntity<?> updateTask(
            @PathVariable Long taskId,
            @RequestBody TaskDto taskDto,
            Authentication authentication) {

        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");
        }

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Long userId = userPrincipal.getId();

        try {
            Task task = taskService.updateTask(taskId, taskDto, userId);
            return ResponseEntity.ok(task);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }

}
