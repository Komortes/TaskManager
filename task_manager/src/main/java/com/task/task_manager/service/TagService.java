package com.task.task_manager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.task.task_manager.model.Tag;
import com.task.task_manager.model.User;
import com.task.task_manager.repository.TagRepository;
import com.task.task_manager.repository.UserRepository;
import com.task.task_manager.dto.TagDto;
import java.util.List;
import java.util.stream.Collectors;
import java.util.ArrayList;

@Service
public class TagService {

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private UserRepository userRepository;

    public Tag createTag(String name, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Tag tag = new Tag(name, user, false); 
        return tagRepository.save(tag);
    }

    public boolean deleteTag(Long tagId, Long userId) {
        Tag tag = tagRepository.findById(tagId).orElse(null);
        if (tag != null && tag.getUser().getId().equals(userId) && !Boolean.TRUE.equals(tag.getIsSystem())) {
            tagRepository.delete(tag);
            return true;
        } else {
            return false;
        }
    }

    public List<TagDto> getAllTagsForUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        List<Tag> systemTags = tagRepository.findAllByIsSystemTrue();
        List<Tag> userTags = tagRepository.findAllByUser(user);
        List<Tag> combinedTags = new ArrayList<>(systemTags);
        combinedTags.addAll(userTags.stream()
                            .filter(tag -> !tag.getIsSystem())  
                            .collect(Collectors.toList()));
    
        return combinedTags.stream()
                .map(tag -> new TagDto(tag.getTagId(), tag.getName(), tag.getIsSystem()))
                .collect(Collectors.toList());
    }
    

    public Tag updateTag(Long tagId, String newName, Long userId) {
        Tag tag = tagRepository.findById(tagId).orElse(null);
        if (tag != null && tag.getUser().getId().equals(userId) && !Boolean.TRUE.equals(tag.getIsSystem())) {
            tag.setName(newName);
            return tagRepository.save(tag);
        } else {
            return null;
        }
    }
}
