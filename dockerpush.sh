#!/usr/bin/env bash


:<<BLOCK
read -p "input old image tag, you will delete it" oldtag
echo $oldtag
BLOCK

echo "您现在有的版本如下："
docker images | grep 118.24.89.72:5000/chat

read -p "input old image tag, you will delete it" oldtag
echo $oldtag

read -p "input new image tag" tag
echo $tag

:<<BLOCK

BLOCK


rm -rf ./server/public/dist/


npm run dll && npm run build 

docker rmi chat:$oldtag --force
docker rmi 118.24.89.72:5000/chat:$oldtag --force

docker build -t chat:$tag .

docker tag chat:$tag 118.24.89.72:5000/chat:$tag

docker push 118.24.89.72:5000/chat:$tag

