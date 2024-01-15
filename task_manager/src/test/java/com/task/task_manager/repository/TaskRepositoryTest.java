package com.task.task_manager.repository;

import com.task.task_manager.model.Task;
import com.task.task_manager.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.junit.jupiter.api.extension.ExtendWith;

import java.util.List;
import java.sql.Timestamp;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(SpringExtension.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
@ActiveProfiles("test")
@TestPropertySource(locations = "classpath:application-test.properties")
public class TaskRepositoryTest {
    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private TaskRepository taskRepository;

    @Test
    public void whenFindAllByUser_thenTasksReturned() {
        User user = new User("username", "email@example.com", "password");
        entityManager.persist(user);

        Task task1 = new Task();
        task1.setName("Task 1");
        task1.setUser(user);
        task1.setCreationDate(new Timestamp(System.currentTimeMillis()));
        entityManager.persist(task1);

        Task task2 = new Task();
        task2.setName("Task 2");
        task2.setUser(user);
        task2.setCreationDate(new Timestamp(System.currentTimeMillis()));
        entityManager.persist(task2);

        List<Task> tasks = taskRepository.findAllByUser(user);

        assertThat(tasks).hasSize(2).contains(task1, task2);
    }
}
