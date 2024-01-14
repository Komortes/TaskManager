package com.task.task_manager.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.task.task_manager.model.Calendar;
import com.task.task_manager.service.CalendarService;
import com.task.task_manager.dto.CalendarDto;
import com.task.task_manager.security.UserPrincipal;
import org.springframework.security.core.Authentication;
import java.util.List;

/**
 * Controller for managing calendars.
 */
@RestController
@RequestMapping("/api/calendars")
@SecurityRequirement(name = "bearerAuth")
public class CalendarController {

    @Autowired
    private CalendarService calendarService;

    /**
     * Creates a new calendar for the authenticated user.
     *
     * @param calendarDto    The calendar data to be created.
     * @param authentication The authentication information for the user.
     * @return ResponseEntity containing the created calendar.
     */
    @Operation(summary = "Create a new calendar", description = "Creates a new calendar for the authenticated user")
    @ApiResponse(responseCode = "200", description = "Calendar created successfully")
    @ApiResponse(responseCode = "401", description = "User is not authenticated")
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

    /**
     * Retrieves all calendars for the authenticated user.
     *
     * @param authentication The authentication information for the user.
     * @return ResponseEntity containing a list of CalendarDto objects.
     */
    @Operation(summary = "Retrieve all calendars", description = "Retrieves all calendars for the authenticated user")
    @ApiResponse(responseCode = "200", description = "Calendars retrieved successfully")
    @ApiResponse(responseCode = "401", description = "User is not authenticated")
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

    /**
     * Deletes a calendar for the authenticated user.
     *
     * @param id             The ID of the calendar to delete.
     * @param authentication The authentication information for the user.
     * @return ResponseEntity indicating the result of the deletion operation.
     */
    @Operation(summary = "Delete a calendar", description = "Deletes a calendar for the authenticated user")
    @ApiResponse(responseCode = "200", description = "Calendar deleted successfully")
    @ApiResponse(responseCode = "404", description = "Calendar not found or not belong to the user")
    @ApiResponse(responseCode = "401", description = "User is not authenticated")
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

    /**
     * Updates an existing calendar for the authenticated user.
     *
     * @param id             The ID of the calendar to update.
     * @param calendarDto    The updated calendar data.
     * @param authentication The authentication information for the user.
     * @return ResponseEntity containing the updated calendar.
     */
    @Operation(summary = "Update a calendar", description = "Updates an existing calendar for the authenticated user")
    @ApiResponse(responseCode = "200", description = "Calendar updated successfully")
    @ApiResponse(responseCode = "404", description = "Calendar not found or not belong to the user")
    @ApiResponse(responseCode = "401", description = "User is not authenticated")
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
