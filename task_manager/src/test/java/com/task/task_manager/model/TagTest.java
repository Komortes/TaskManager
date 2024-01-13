package com.task.task_manager.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class TagTest {

    @Test
    void gettersAndSettersShouldWorkCorrectly() {
        User user = new User("username", "email@example.com", "password");
        Tag tag = new Tag("tagname", user, true);

        assertEquals("tagname", tag.getName());
        assertTrue(tag.getIsSystem());
        assertEquals(user, tag.getUser());

        tag.setName("newtagname");
        tag.setIsSystem(false);
        User newUser = new User("newusername", "newemail@example.com", "newpassword");
        tag.setUser(newUser);

        assertEquals("newtagname", tag.getName());
        assertFalse(tag.getIsSystem());
        assertEquals(newUser, tag.getUser());
    }
}
