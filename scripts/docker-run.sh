#!/bin/sh

name="online-test-api"
image="online-test"

docker run \
  -p 3000:3000 \
  --name "${name}" \
  "${image}"
