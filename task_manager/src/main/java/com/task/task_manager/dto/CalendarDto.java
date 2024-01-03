package com.task.task_manager.dto;

import com.task.task_manager.model.Calendar;

public class CalendarDto {
    private Long calendarId;
    private String name;

    public CalendarDto() {
    }

    public CalendarDto(Calendar calendar) {
        this.calendarId = calendar.getCalendarId();
        this.name = calendar.getName();
    }

    public Long getCalendarId() {
        return calendarId;
    }

    public void setCalendarId(Long calendarId) {
        this.calendarId = calendarId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
