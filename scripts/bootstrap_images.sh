#!/bin/bash
#title          :bootstrap_images.sh
#desc           :bootstrap all required docker images
#author         :Matthew Zito (goldmund)
#created        :11/2020
#version        :1.0.0
#usage          :bash ./bootstrap_images.sh
#environment    :bash 5.0.17
#===============================================================================
[[ ! -x "$(command -v docker)" ]] && echo '[-] Docker must be installed and resolved on PATH' && exit 1;
docker build -t exbotanical/vue-forum-api-auth:latest -f ./packages/auth/Dockerfile.dev ./packages/auth
