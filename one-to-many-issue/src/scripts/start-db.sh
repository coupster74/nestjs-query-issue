#!/bin/bash
set -e

SERVER="testdb";
PW="test";
DB="testdb";

echo "echo stop & remove old docker [$SERVER] and starting new fresh instance of [$SERVER]"
(docker kill $SERVER || :) && \
  (docker rm $SERVER || :) && \
  docker run --name $SERVER -e POSTGRES_PASSWORD=$PW \
  -e PGPASSWORD=$PW \
  -p 5433:5432 \
  -v ~/postgres-data:/var/lib/postgresql/data2 \
  -d postgres 

# wait for pg to start
echo "sleep wait for pg-server [$SERVER] to start";
SLEEP 5;

# create the db 
echo "SELECT 'CREATE DATABASE $DB' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '$DB')\gexec" | docker exec -i $SERVER psql -U postgres
echo "\l" | docker exec -i $SERVER psql -U postgres
