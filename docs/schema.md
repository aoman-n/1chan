## DB DESIGN

### threads table

- id
- title
- description
- created_at

|column     |type     |description     |
|-----------|---------|----------------|
|id         |int      |primary key     |
|title      |string   |                |
|description|string   |                |
|created_at |date     |                |
|updated_at |date     |                |


### posts table

- id
- user_name
- message
- created_at
- updated_at
- author_hash

|column     |type     |description     |
|-----------|---------|----------------|
|id         |int      |primary key     |
|thread_id  |int      |foreign key     |
|user_name  |string   |                |
|message    |string   |                |
|image      |string   |                |
|created_at |date     |                |
|updated_at |date     |                |
|author_hash|string   |削除時に使用      |