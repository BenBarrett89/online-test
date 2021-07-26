#!/bin/sh

postman_directory="$( cd "$( dirname "${0}" )" && cd ../test/postman && pwd )"

collection_name="Online Test"
environment_name="Online Test Docker Environment"

docker run \
  -v ${postman_directory}:/etc/newman \
  -t postman/newman:alpine \
  run "${collection_name}.postman_collection.json" \
  --environment="/etc/newman/environments/${environment_name}.postman_environment.json"
