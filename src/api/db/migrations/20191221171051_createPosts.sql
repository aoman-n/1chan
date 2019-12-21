
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE posts (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    user_name VARCHAR(255) NOT NULL,
    thread_id INT(11) unsigned NOT NULL,
    message VARCHAR(255) NOT NULL,

    PRIMARY KEY (id),
    INDEX(thread_id),
    CONSTRAINT fk_thread_id
      FOREIGN KEY (thread_id)
      REFERENCES threads (id)
      ON UPDATE CASCADE ON DELETE CASCADE
);


-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
DROP TABLE IF EXISTS posts;
