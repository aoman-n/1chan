#!/bin/bash
set -e

until mysqladmin ping -h ${DATABASE_HOST} -P ${DATABASE_PORT} --silent; do
  echo "waiting for mysql..."
  sleep 1s
done
echo "success to connect mysql"

goose up
echo "migrated."

gin -i run

exec "$@"