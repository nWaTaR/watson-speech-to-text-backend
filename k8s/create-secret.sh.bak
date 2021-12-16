#!/bin/sh

# 使わないかも
set -ue

source .env

kubectl create secret \
    -n nishiki-watson-speech-to-text-backend \
    docker-registry quay-io-watson-speech-to-text-backend-password \
    --docker-server=$CONTAINER_REGISTRY_SERVER \
    --docker-username=$CONTAINER_REGISTRY_USER \
    --docker-password=$CONTAINER_REGISTRY_PASSWORD


