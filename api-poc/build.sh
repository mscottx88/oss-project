#!/bin/bash

set -e

gcloud config set project oss-dev-213920
gcloud config set compute/region us-central-1
gcloud config set compute/zone us-central1-a
gcloud container clusters get-credentials oss-cluster-1

docker build --build-arg port=8888 --build-arg SSH_PRIVATE_KEY="$(cat ~/.ssh/id_rsa)" -t gcr.io/oss-dev-213920/api-poc:1.0.0 .
gcloud docker -- push gcr.io/oss-dev-213920/api-poc:1.0.0

kubectl delete deployment --ignore-not-found=true api-poc
kubectl apply -f deploy.yaml
