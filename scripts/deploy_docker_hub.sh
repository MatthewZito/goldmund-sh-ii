#!/usr/bin/env bash
#title          :deploy_docker_hub.sh
#desc           :script for github to automate dockerhub publishing
#author         :Matthew Zito (goldmund)
#created        :11/2020
#version        :1.0.0  
#usage          :bash ./deploy_docker_hub.sh
#environment    :bash 5.0.17
#===============================================================================
docker build -t exbotanical/vue-forum-auth:latest -t exbotanical/vue-forum-auth:$COMMIT_SHA -f ./packages/vue-forum-auth/Dockerfile ./packages/auth
docker push exbotanical/vue-forum-auth:latest
docker push exbotanical/vue-forum-auth:$COMMIT_SHA 

### EXAMPLE Automation for Google Cloud ###

# kubectl apply $(ls ./kubernetes/*.yml | awk ' { print " -f " $1 } ')
# kubectl set image deployments/vue-forum-auth-deployment vue-forum-auth=exbotanical/vue-forum-auth:$COMMIT_SHA
