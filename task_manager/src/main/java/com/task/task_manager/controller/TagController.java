package com.task.task_manager.controller;

import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.task.task_manager.model.Tag;
import com.task.task_manager.service.TagService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

import com.task.task_manager.dto.TagDto;
import com.task.task_manager.security.UserPrincipal;
import org.springframework.security.core.Authentication;
import java.util.List;

/**
 * Controller for managing tags.
 */
@RestController
@RequestMapping("/api/tags")
@SecurityRequirement(name = "bearerAuth")
public class TagController {

    @Autowired
    private TagService tagService;

    /**
     * Creates a new tag for the authenticated user.
     *
     * @param tagDto         The tag data to be created.
     * @param authentication The authentication information for the user.
     * @return ResponseEntity containing the created tag.
     */
    @Operation(summary = "Create a new tag", description = "Creates a new tag for the authenticated user.")
    @ApiResponse(responseCode = "200", description = "Tag created successfully")
    @ApiResponse(responseCode = "401", description = "Unauthorized")
    @PostMapping
    public ResponseEntity<?> createTag(@RequestBody TagDto tagDto, Authentication authentication) {
        if (authentication != null) {
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            Long userId = userPrincipal.getId();
            Tag tag = tagService.createTag(tagDto.getName(), userId);
            return ResponseEntity.ok(tag);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");
        }
    }

    /**
     * Retrieves all tags for the authenticated user.
     *
     * @param authentication The authentication information for the user.
     * @return ResponseEntity containing a list of TagDto objects.
     */
    @Operation(summary = "Get all tags", description = "Retrieves all tags for the authenticated user.")
    @ApiResponse(responseCode = "200", description = "List of tags retrieved successfully")
    @ApiResponse(responseCode = "401", description = "Unauthorized")
    @GetMapping
    public ResponseEntity<?> getAllTags(Authentication authentication) {
        if (authentication != null) {
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            Long userId = userPrincipal.getId();
            List<TagDto> tagDtos = tagService.getAllTagsForUser(userId);
            return ResponseEntity.ok(tagDtos);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");
        }
    }

    /**
     * Deletes a tag for the authenticated user.
     *
     * @param id             The ID of the tag to delete.
     * @param authentication The authentication information for the user.
     * @return ResponseEntity indicating the result of the deletion operation.
     */
    @Operation(summary = "Delete a tag", description = "Deletes a tag for the authenticated user.")
    @ApiResponse(responseCode = "200", description = "Tag deleted successfully")
    @ApiResponse(responseCode = "401", description = "Unauthorized")
    @ApiResponse(responseCode = "404", description = "Tag not found or not belong to the user")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTag(@PathVariable Long id, Authentication authentication) {
        if (authentication != null) {
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            Long userId = userPrincipal.getId();
            boolean deleted = tagService.deleteTag(id, userId);
            if (deleted) {
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Tag not found or not belong to the user or is system tag");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");
        }
    }

    /**
     * Updates an existing tag for the authenticated user.
     *
     * @param id             The ID of the tag to update.
     * @param tagDto         The updated tag data.
     * @param authentication The authentication information for the user.
     * @return ResponseEntity containing the updated tag.
     */
    @Operation(summary = "Update a tag", description = "Updates an existing tag for the authenticated user.")
    @ApiResponse(responseCode = "200", description = "Tag updated successfully")
    @ApiResponse(responseCode = "401", description = "Unauthorized")
    @ApiResponse(responseCode = "404", description = "Tag not found or not belong to the user")
    @PutMapping("/{id}")
    public ResponseEntity<?> updateTag(@PathVariable Long id, @RequestBody TagDto tagDto,
            Authentication authentication) {
        if (authentication != null) {
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            Long userId = userPrincipal.getId();
            Tag updatedTag = tagService.updateTag(id, tagDto.getName(), userId);
            if (updatedTag != null) {
                return ResponseEntity.ok(updatedTag);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Tag not found or not belong to the user or is system tag");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");
        }
    }
}
