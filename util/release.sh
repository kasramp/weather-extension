#!/bin/bash

TAG_VERSION=`cat manifest.json | jq '. | .version' | tr -d '"'`
TAG_VERSION=v$TAG_VERSION

LAST_RELEASE=`git describe --abbrev=0` || LAST_RELEASE=v0.0

if [ "$TAG_VERSION" != "$LAST_RELEASE" ]
then
	echo "Start releasing version $TAG_VERSION ..."
	#git tag -a $TAG_VERSION -m "Release $TAG_VERSION"
	#git push --tags
	#wget -nv -P /tmp/ https://dl.google.com/go/go1.12.2.linux-amd64.tar.gz
    #sudo tar -C /tmp/ -xf /tmp/go1.12.2.linux-amd64.tar.gz
    #sudo mv /tmp/go /usr/local
    #export GOROOT=/usr/local/go
	mkdir -p /tmp/weather-extension
	yes | cp -rf * /tmp/weather-extension
	rm -rvf /tmp/weather-extension/util
	#google-chrome-stable --no-sandbox --pack-extension=/tmp/weather-extension/
	nvm install $TRAVIS_NODE_VERSION
	npm install crx
	cd /tmp/weather-extension
	crx pack -o
	ls /tmp/
	go get github.com/aktau/github-release
	github-release --help
fi
