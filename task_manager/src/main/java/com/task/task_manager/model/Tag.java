package com.task.task_manager.model;

import jakarta.persistence.*;

@Entity  
@Table(name = "tag")  
public class Tag {
    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long tagId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = true)
    private Boolean isSystem;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Tag() {
    }

    public Tag(String name, User user, Boolean isSystem) {
        this.name = name;
        this.user = user;
        this.isSystem = isSystem;
    }
}
