FROM node:lts-buster-slim

WORKDIR /home/node
RUN apt update \
    && apt install -y \
        mariadb-client \
        sudo \
        supervisor \
        whois \
    && rm -rf /var/lib/apt/lists/* \
    && yarn global add \
        typeorm \
    && typeorm init --name app --database mysql \
    && chown -R node:node /home/node

USER node
WORKDIR /home/node/app
RUN yarn add \
         @types/express \
         @types/express-session \
         @types/jest \
         @types/node \
         @types/supertest \
         @typescript-eslint/eslint-plugin \
         @typescript-eslint/parser \
         cors \
         eslint \
         eslint-config-prettier \
         eslint-plugin-prettier \
         express \
         express-session \
         jest \
         mysql2 \
         prettier \
         reflect-metadata \
         supertest \
         ts-jest \
         ts-node \
         tsconfig-paths \
         typescript

ENV APP_HOME /home/node/app
USER root
CMD /usr/bin/supervisord -nc /etc/supervisor/supervisord.conf

