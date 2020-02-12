#!/bin/bash
set -e

echo DB_HOST
echo ${DB_HOST}
echo DB_PORT
echo ${DB_PORT}

until mysqladmin ping -h ${DB_HOST} -P ${DB_PORT} --silent; do
  echo "waiting for mysql..."
  sleep 2
done
echo "success to connect mysql"

goose up
echo "migrated."

if [ $GO_ENV = "production" ]; then
  /app/build
elif [ $GO_ENV = "development" ]; then
  gin -i run
fi

exec "$@"