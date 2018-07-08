#!/usr/bin/env bash

set -euo pipefail

project_root_path=${PWD%/*}
project_name=${PWD##*/}
project_path=$(pwd)

echo $project_root_path
echo $project_name
echo $project_path

container_name='docker-'$project_name

echo 'env cleaning'

{
  docker stop $container_name
  docker rm $container_name
} > /dev/null

echo 'configurate new container'
echo 'container launching...'

read -p "input new image tag" tag
echo $tag

docker run -d \
-p 3001:3000 \
--name manage-skynet \
172.28.3.45:5000/manage-skynet:$tag

echo 'container bootup successful~ : )'


:<<BLOCK
command || { echo "command failed"; exit 1; }
BLOCK

