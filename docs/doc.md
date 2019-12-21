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
|created_at |date     |                |
|updated_at |date     |                |
|image      |string   |                |
|author_hash|string   |削除時に使用      |

## API

### create thread

GET `/api/v1/threads`

Request Params
```json
{
  "title": "sample title",
  "description": "sample description"
}
```

Sample Request
```shell
$ curl -X POST -H "Content-Type: application/json" \
-d '{ "title": "sample title", "description": "sample desc." }' \
http://localhost:3001/api/v1/threads

> {"status":"ok"}
```