#!/bin/sh
kubectl create sa build-bot

kubectl patch serviceaccount build-bot \
    -p '{"secrets": [{"name": "quay-io-watson-speech-to-text-backend-password"}]}'
kubectl patch serviceaccount build-bot \
    -p '{"imagePullSecrets": [{"name": "quay-io-watson-speech-to-text-backend-password"}]}'

kubectl get sa \
    -n nishiki-watson-speech-to-text-backend \
    build-bot -o yaml

oc policy add-role-to-user cluster-admin \
    -z build-bot
