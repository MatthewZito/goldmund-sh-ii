#!/bin/bash
[[ $(echo $(which lerna) | wc -m) -eq 1 ]] && echo '[-] Lerna not found on PATH' && exit 1;
lerna run serve:watch --stream