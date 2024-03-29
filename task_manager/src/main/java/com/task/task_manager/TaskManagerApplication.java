package com.task.task_manager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {"com.task.task_manager"})
public class TaskManagerApplication {

    public static void main(String[] args) {
        SpringApplication.run(TaskManagerApplication.class, args);
    }
}


//Test run
// ./gradlew test -Dspring.profiles.active=test  -PflywayProfile=test

//Fix migrations 
// ./gradlew flywayRepair -Dspring.profiles.active=test  -PflywayProfile=test