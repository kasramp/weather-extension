#!/bin/bash

TAG_VERSION=`cat manifest.json | jq '. | .version' | tr -d '"'`
TAG_VERSION=v$TAG_VERSION

LAST_RELEASE=`git describe --abbrev=0` || LAST_RELEASE=v0.0

if [ "$TAG_VERSION" != "$LAST_RELEASE" ]
then
	echo "Start releasing version $TAG_VERSION ..."
	git tag -a $TAG_VERSION -m "Release $TAG_VERSION"
	git push --tags
	echo "Finished releasing version $TAG_VERSION!"
	# don't publish .crx file
	#mkdir -p /tmp/weather-extension
	#yes | cp -rf * /tmp/weather-extension
	#rm -rvf /tmp/weather-extension/util
	#google-chrome-stable --pack-extension=/tmp/weather-extension/
fi
