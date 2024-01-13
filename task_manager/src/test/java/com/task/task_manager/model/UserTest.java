package com.task.task_manager.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class UserTest {

    @Test
    void equalsShouldReturnTrueForSameObject() {
        User user = new User("username", "email@example.com", "password");
        assertTrue(user.equals(user));
    }

    @Test
    void equalsShouldReturnFalseForDifferentObject() {
        User user1 = new User("username1", "email1@example.com", "password1");
        User user2 = new User("username2", "email2@example.com", "password2");
        assertFalse(user1.equals(user2));
    }

    @Test
    void hashCodeShouldBeConsistent() {
        User user = new User("username", "email@example.com", "password");
        int hashCode1 = user.hashCode();
        int hashCode2 = user.hashCode();
        assertEquals(hashCode1, hashCode2);
    }

    @Test
    void toStringShouldContainRelevantInformation() {
        User user = new User("username", "email@example.com", "password");
        String toStringResult = user.toString();
        assertTrue(toStringResult.contains("username") && toStringResult.contains("email@example.com"));
    }
}
