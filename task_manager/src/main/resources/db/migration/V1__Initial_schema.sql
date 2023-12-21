CREATE TABLE "User" (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE "Calendar" (
    calendar_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "User" (user_id)
);

CREATE TABLE "Category" (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    color VARCHAR(50),
    symbol VARCHAR(255),
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES "User" (user_id)
);

CREATE TABLE "Tag" (
    tag_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES "User" (user_id)
);

CREATE TABLE "Task" (
    task_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50),
    creation_date TIMESTAMP NOT NULL,
    due_date TIMESTAMP,
    time TIME,
    repeat BOOLEAN,
    calendar_id INTEGER,
    category_id INTEGER,
    FOREIGN KEY (calendar_id) REFERENCES "Calendar" (calendar_id),
    FOREIGN KEY (category_id) REFERENCES "Category" (category_id)
);

CREATE TABLE "Task_Tag" (
    task_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY (task_id, tag_id),
    FOREIGN KEY (task_id) REFERENCES "Task" (task_id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES "Tag" (tag_id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX idx_category_name_user ON "Category" (name, user_id);

CREATE UNIQUE INDEX idx_tag_name_user ON "Tag" (name, user_id);
