#!/bin/sh

image_tag="online-test"

dockerfile_directory="$( cd "$( dirname "${0}" )" && cd .. && pwd )"

docker build \
  --tag "${image_tag}" \
  "${dockerfile_directory}"
