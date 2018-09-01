FROM node:carbon-alpine

ENV RELEASE_CHANNEL dev
ENV EXP_USERNAME "user"
ENV EXP_PASSWORD "pass"

RUN npm install -g exp

RUN npm -g bin

CMD [ "/usr/local/bin/exp", "login", "-u", "$EXP_USERNAME", "-p", "$EXP_PASSWORD"]

CMD ["exp", "build:android"]
