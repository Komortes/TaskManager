package com.task.task_manager.dto;

import com.task.task_manager.model.Tag;

public class TagDto {
    private Long tagId;
    private String name;
    private Boolean isSystem;

    public TagDto() {
    }

    public TagDto(Long tagId, String name, Boolean isSystem) {
        this.tagId = tagId;
        this.name = name;
        this.isSystem = isSystem;
    }

    public TagDto(Long tagId, String name) {
        this.tagId = tagId;
        this.name = name;
    }

    public TagDto(Tag tag) {
        this.tagId = tag.getTagId();
        this.name = tag.getName();
        this.isSystem = tag.getIsSystem();
    }

    public Long getTagId() {
        return tagId;
    }

    public void setTagId(Long tagId) {
        this.tagId = tagId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getIsSystem() {
        return isSystem;
    }

    public void setIsSystem(Boolean isSystem) {
        this.isSystem = isSystem;
    }
}
