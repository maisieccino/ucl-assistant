#!/bin/sh
set -e
NODE_ENV=test
cd repo
yarn install --pure-lockfile

(cd api && yarn install --pure-lockfile)
(cd app && yarn install --pure-lockfile)
(cd lib && yarn install --pure-lockfile)
(cd notifications && yarn install --pure-lockfile)

yarn run eslint . --ext .js --ext .jsx --cache --ignore-path .eslintignore
yarn run jest --projects api app lib notifications