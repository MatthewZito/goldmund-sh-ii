#!/bin/bash
#title          :docker_purge.sh
#desc           :stop all containers, prune dangling images, rm custom networks
#author         :Matthew Zito (goldmund)
#created        :11/2020
#version        :1.0.0
#usage          :bash ./docker_purge.sh
#environment    :bash 5.0.17
#===============================================================================
docker stop $(docker ps -aq)
docker-compose rm -f
docker images | grep vue-forum-auth | tr -s ' ' | cut -d ' ' -f 2 | xargs -I {} docker rmi vue-forum_vue-forum-auth:{}
docker images | grep vue-forum-client | tr -s ' ' | cut -d ' ' -f 2 | xargs -I {} docker rmi vue-forum_vue-forum-client:{}
docker rmi $(docker images -f dangling=true -q)
docker rm $(docker ps -a -q)
docker image prune
docker volume prune
docker network ls -q | xargs docker network rm
