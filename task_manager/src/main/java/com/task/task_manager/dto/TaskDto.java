package com.task.task_manager.dto;

import java.sql.Timestamp;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Set;
import java.util.stream.Collectors;


import com.task.task_manager.model.Task;
import com.task.task_manager.model.Tag;

public class TaskDto {
    private Long taskId;
    private String title;
    private String description;
    private Timestamp creationDate;
    private Timestamp dueDate;
    private String time;
    private Boolean repeat;
    private String status;
    private Long categoryId;
    private Set<Long> tagIds;
    private String categoryColor;
    private Long calendarId;

    public TaskDto() {
    }

    public TaskDto(String title, String description, Timestamp dueDate, String time, Boolean repeat, String status,
            Long categoryId, Set<Long> tagIds, Timestamp creationDate) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.time = time;
        this.repeat = repeat;
        this.status = status;
        this.categoryId = categoryId;
        this.tagIds = tagIds;
        this.creationDate = creationDate;
    }

    public TaskDto(Task task) {
        this.taskId = task.getTaskId();
        this.title = task.getName();
        this.description = task.getDescription();
        this.creationDate = task.getCreationDate();
        this.dueDate = task.getDueDate();
        this.time = (task.getTime() != null) ? task.getTime().toString() : null;
        this.repeat = task.getRepeat();
        this.status = task.getStatus();

        if (task.getCategory() != null) {
            this.categoryId = task.getCategory().getId();
            this.categoryColor = task.getCategory().getColor();
        }

        if (task.getCalendar() != null) {
            this.calendarId = task.getCalendar().getCalendarId();
        }

        if (task.getTags() != null && !task.getTags().isEmpty()) {
            this.tagIds = task.getTags().stream()
                    .map(Tag::getTagId)
                    .collect(Collectors.toSet());
        }

    }

    public Long getCalendarId() {
        return calendarId;
    }

    public void setCalendarId(Long calendarId) {
        this.calendarId = calendarId;
    }

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Timestamp getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Timestamp creationDate) {
        this.creationDate = creationDate;
    }

    public Timestamp getDueDate() {
        return dueDate;
    }

    public void setDueDate(Timestamp dueDate) {
        this.dueDate = dueDate;
    }

    public LocalTime getTime() {
        try {
            return LocalTime.parse(time, DateTimeFormatter.ofPattern("HH:mm"));
        } catch (DateTimeParseException e) {
            throw new IllegalArgumentException("Time format is wrong", e);
        }
    }

    public void setTime(String time) {
        this.time = time;
    }

    public Boolean getRepeat() {
        return repeat;
    }

    public void setRepeat(Boolean repeat) {
        this.repeat = repeat;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public Set<Long> getTagIds() {
        return tagIds;
    }

    public void setTagIds(Set<Long> tagIds) {
        this.tagIds = tagIds;
    }

    public String getCategoryColor() {
        return categoryColor;
    }

    public void setCategoryColor(String categoryColor) {
        this.categoryColor = categoryColor;
    }
}
