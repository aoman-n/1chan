#!/bin/bash
set -e

until mysqladmin ping -h ${DATABASE_HOST} -P ${DATABASE_PORT} --silent; do
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