#!/bin/bash     
#title          :dev.sh
#desc           :execute all observable dev scripts
#author         :Matthew Zito (goldmund)
#created        :11/2020
#version        :1.0.0  
#usage          :bash ./dev.sh
#environment    :bash 5.0.17
#===============================================================================

[[ $(echo $(which lerna) | wc -m) -eq 1 ]] && echo '[-] Lerna not found on PATH' && exit 1;
lerna run dev --stream