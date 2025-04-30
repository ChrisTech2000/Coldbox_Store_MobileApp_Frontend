#!/bin/bash
set -e

# Runtime helpers
ENVIRONMENT=e2e
CURRENT_DIR=$(dirname -- "$0")
PROJECT_NAME="coldtivate-$ENVIRONMENT"
DOT_ENV_FILENAME=${DOT_ENV_FILENAME:-.env.${ENVIRONMENT}}
DOCKER_COMPOSE_CMD="docker-compose --project-name=$PROJECT_NAME --project-directory=$CURRENT_DIR  --env-file=$CURRENT_DIR/$DOT_ENV_FILENAME"
E2E_SEED_FILE="e2e_seed.sql"

source $CURRENT_DIR/$DOT_ENV_FILENAME

# Pull the most recent images based on the given configuration
$DOCKER_COMPOSE_CMD pull

# update the base services first
$DOCKER_COMPOSE_CMD up --wait -d db valkey

# Database connection
DB_PSQL="$DOCKER_COMPOSE_CMD exec -T db env PGPASSWORD=$DB_PASSWORD psql -U $DB_USERNAME -d postgres -h localhost -p $DB_PORT"

# Check if the e2e_seed database exists and initialize it if needed
$DB_PSQL -tc "SELECT 1 FROM pg_database WHERE datname = 'e2e_seed';" | grep -q 1 || {
  echo "e2e_seed database not found. Initializing..."
  $DB_PSQL < "$CURRENT_DIR/$E2E_SEED_FILE"
}

# Drop the base database if it exists
$DB_PSQL -c "DROP DATABASE IF EXISTS base;"

# Recreate the base database using e2e_seed as the template
$DB_PSQL -c "CREATE DATABASE base TEMPLATE e2e_seed;"

# Enable PostGIS on base (just in case)
$DOCKER_COMPOSE_CMD exec -T db env PGPASSWORD=$DB_PASSWORD psql -U $DB_USERNAME -d base -c "CREATE EXTENSION IF NOT EXISTS postgis;"

# Execute migrations
$DOCKER_COMPOSE_CMD run web pipenv run python manage.py migrate

# We should be ready to now rollout the rest of the dependencies
exec $DOCKER_COMPOSE_CMD up -d --remove-orphans;

echo "The E2E testing environment was _coldtivated_ with great success! 👀"
