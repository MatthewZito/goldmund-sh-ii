#!/bin/bash     
#title          :purge_images.sh
#desc           :purge all vue-forum docker images
#author         :Matthew Zito (goldmund)
#created        :11/2020
#version        :1.0.0  
#usage          :bash ./purge_images.sh
#environment    :bash 5.0.17
#===============================================================================

docker images | grep vue-forum-auth | tr -s ' ' | cut -d ' ' -f 2 | xargs -I {} docker rmi exbotanical/vue-forum-auth:{}
docker images | grep vue-forum-client | tr -s ' ' | cut -d ' ' -f 2 | xargs -I {} docker rmi exbotanical/vue-forum-client:{}