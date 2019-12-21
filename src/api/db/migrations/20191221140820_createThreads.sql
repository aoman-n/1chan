
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE threads (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    PRIMARY KEY(id)
);

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
DROP TABLE IF EXISTS threads;
