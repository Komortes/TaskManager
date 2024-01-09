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
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

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

    public boolean deleteTask(Long taskId, Long userId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        if (!task.getUser().getId().equals(userId)) {
            return false;
        }

        task.getTags().clear();
        taskRepository.save(task);
        taskRepository.delete(task);
        return true;
    }

    public Task updateTask(Long taskId, TaskDto taskDto, Long userId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getUser().getId().equals(userId)) {
            throw new RuntimeException("Access denied");
        }

        task.setName(taskDto.getTitle());
        task.setDescription(taskDto.getDescription());
        task.setStatus(taskDto.getStatus());
        if (!taskDto.getTime().equals(task.getTime())) {
            task.setTime(taskDto.getTime());
        }

        task.setRepeat(taskDto.getRepeat());

        if (taskDto.getCategoryId() != null) {
            Category category = categoryRepository.findById(taskDto.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            task.setCategory(category);
        }

        Set<Tag> tags = new HashSet<>();
        if (taskDto.getTagIds() != null && !taskDto.getTagIds().isEmpty()) {
            for (Long tagId : taskDto.getTagIds()) {
                Tag tag = tagRepository.findById(tagId)
                        .orElseThrow(() -> new RuntimeException("Tag not found with id: " + tagId));
                tags.add(tag);
            }
        }
        task.setTags(tags);

        return taskRepository.save(task);
    }

    public TaskDto getTasksById(Long task_id) {
        Task task = taskRepository.findAllByTaskId(task_id);
        TaskDto dto = new TaskDto(task);
        return dto;
    }

}
