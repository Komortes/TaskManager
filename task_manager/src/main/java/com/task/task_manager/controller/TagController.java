package com.task.task_manager.controller;

import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.task.task_manager.model.Tag;
import com.task.task_manager.service.TagService;
import com.task.task_manager.dto.TagDto;
import com.task.task_manager.security.UserPrincipal;
import org.springframework.security.core.Authentication;
import java.util.List;

@RestController
@RequestMapping("/api/tags")
public class TagController {

    @Autowired
    private TagService tagService;

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
