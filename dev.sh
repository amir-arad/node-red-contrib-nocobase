#!/usr/bin/env bash

# exit when any command fails
set -e

docker compose -f ./docker/docker-compose.yml down

# install packed library into ./docker/node-red/data
npm pack --quiet
npm -prefix ./docker/node_red_data install --no-save  ./node-red-contrib-nocobase-*.tgz

# fire up the Node-RED docker
docker compose -f ./docker/docker-compose.yml up