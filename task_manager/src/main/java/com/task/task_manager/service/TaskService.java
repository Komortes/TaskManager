package com.task.task_manager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.task.task_manager.model.Task;
import com.task.task_manager.model.User;
import com.task.task_manager.repository.CategoryRepository;
import com.task.task_manager.repository.TagRepository;
import com.task.task_manager.repository.TaskRepository;
import com.task.task_manager.repository.UserRepository;
import com.task.task_manager.repository.CalendarRepository;
import com.task.task_manager.dto.TaskDto;
import com.task.task_manager.model.Category;
import com.task.task_manager.model.Calendar;
import com.task.task_manager.model.Tag;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private CalendarRepository calendarRepository;

    public Task createTask(TaskDto taskDto, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Task task = new Task();
        task.setName(taskDto.getTitle());
        task.setDescription(taskDto.getDescription());
        task.setStatus(taskDto.getStatus());
        task.setCreationDate(new Timestamp(System.currentTimeMillis()));
        task.setDueDate(taskDto.getDueDate());
        task.setTime(taskDto.getTime());
        task.setRepeat(taskDto.getRepeat());
        task.setUser(user);

        if (taskDto.getCategoryId() != null) {
            Category category = categoryRepository.findById(taskDto.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            task.setCategory(category);
        }

        if (taskDto.getCalendarId() != null) {
            Calendar calendar = calendarRepository.findById(taskDto.getCalendarId())
                    .orElseThrow(() -> new RuntimeException("Calendar not found"));
            task.setCalendar(calendar);
        }

        if (taskDto.getTagIds() != null && !taskDto.getTagIds().isEmpty()) {
            Set<Tag> tags = new HashSet<>();
            for (Long tagId : taskDto.getTagIds()) {
                Tag tag = tagRepository.findById(tagId)
                        .orElseThrow(() -> new RuntimeException("Tag not found with id: " + tagId));
                tags.add(tag);
            }
            task.setTags(tags);
        }

        return taskRepository.save(task);
    }

    public List<TaskDto> getTasksByCalendarAndMonth(Long calendarId, int year, int month) {
        List<Task> tasks = taskRepository.findTasksByCalendarAndYearAndMonth(calendarId, year, month);

        return tasks.stream().map(task -> {
            TaskDto dto = new TaskDto(task);
            if (task.getCategory() != null) {
                dto.setCategoryColor(task.getCategory().getColor());
            }
            return dto;
        }).collect(Collectors.toList());
    }

    private TaskDto convertToDto(Task task) {
        TaskDto dto = new TaskDto();

        dto.setTaskId(task.getTaskId());
        dto.setTitle(task.getName());
        dto.setDescription(task.getDescription());
        dto.setCreationDate(task.getCreationDate());
        dto.setDueDate(task.getDueDate());
        dto.setTime(task.getTime() != null ? task.getTime().toString() : null);
        dto.setRepeat(task.getRepeat());
        dto.setStatus(task.getStatus());
        dto.setCategoryColor(task.getCategory() != null ? task.getCategory().getColor() : null);
        dto.setCategoryId(task.getCategory() != null ? task.getCategory().getId() : null);
        return dto;
    }

    public boolean deleteTask(Long taskId, Long userId) {
        Task task = taskRepository.findById(taskId).orElse(null);
        if (task != null) {
            taskRepository.delete(task);
            return true;
        } else {
            return false;
        }
    }

    public Task updateTask(Long taskId, TaskDto taskDto, Long userId) {
        Task task = taskRepository.findById(taskId).orElse(null);
        if (task != null) {
            task.setName(taskDto.getTitle());
            task.setDescription(taskDto.getDescription());

            return taskRepository.save(task);
        } else {
            return null;
        }
    }

}
