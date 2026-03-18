#! /bin/bash

docker run --name hamuel_web -v ${PWD}/content:/usr/share/nginx/html:ro -d -p 3000:80 nginx
