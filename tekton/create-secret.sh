#!/bin/sh

set -ue

# source .env

export CONTAINER_REGISTRY_SERVER='https://quay.io'
export CONTAINER_REGISTRY_USER='wataru_nishiki1_ibm'
export CONTAINER_REGISTRY_PASSWORD=$1

kubectl create secret \
    -n nishiki-watson-speech-to-text-backend \
    docker-registry quay-io-watson-speech-to-text-backend-password \
    --docker-server=$CONTAINER_REGISTRY_SERVER \
    --docker-username=$CONTAINER_REGISTRY_USER \
    --docker-password=$CONTAINER_REGISTRY_PASSWORD
