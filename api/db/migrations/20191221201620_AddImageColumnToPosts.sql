
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
ALTER TABLE posts
ADD image VARCHAR(255) DEFAULT NULL;

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
ALTER TABLE posts
DROP COLUMN image;
