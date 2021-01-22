#!/bin/bash
#title          :clean_images.sh
#desc           :purge all vue-forum docker images
#author         :Matthew Zito (goldmund)
#created        :11/2020
#version        :1.0.0
#usage          :bash ./clean_images.sh
#environment    :bash 5.0.17
#===============================================================================
echo '[*] Purging all vue-forum-auth images'
docker images | grep vue-forum-auth | tr -s ' ' | cut -d ' ' -f 2 | xargs -I {} docker rmi exbotanical/vue-forum-auth:{}

echo '[*] Purging all vue-forum-client images'
docker images | grep vue-forum-client | tr -s ' ' | cut -d ' ' -f 2 | xargs -I {} docker rmi exbotanical/vue-forum-client:{}
