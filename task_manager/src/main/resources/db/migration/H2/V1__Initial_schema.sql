
CREATE TABLE "users" (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE "calendar" (
    calendar_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "users" (user_id)
);

CREATE TABLE "category" (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    color VARCHAR(50),
    symbol VARCHAR(255),
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES "users" (user_id)
);

CREATE TABLE "tag" (
    tag_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES "users" (user_id)
);

CREATE TABLE "task" (
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
    FOREIGN KEY (calendar_id) REFERENCES "calendar" (calendar_id),
    FOREIGN KEY (category_id) REFERENCES "category" (category_id)
);

CREATE TABLE "task_tag" (
    task_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY (task_id, tag_id),
    FOREIGN KEY (task_id) REFERENCES "task" (task_id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES "tag" (tag_id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX idx_category_name_user ON "category" (name, user_id);

CREATE UNIQUE INDEX idx_tag_name_user ON "tag" (name, user_id);

INSERT INTO "users" (username, email, password) VALUES ('Test User', 'test@example.com', '$2a$10$K3H3vzUKblK1LEAY6GtzQ.ljLu0Z4lUJN.x2MaXyKc7L2RdMwYhM6');
