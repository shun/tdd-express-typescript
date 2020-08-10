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
         @types/bcrypt \
         @types/express \
         @types/express-session \
         @types/graphql@^14.0.0 \
         @types/jest \
         @types/node \
         @types/supertest \
         @typescript-eslint/eslint-plugin \
         @typescript-eslint/parser \
         apollo-cache-inmemory \
         apollo-client \
         apollo-link-error \
         apollo-link-http \
         apollo-server-express \
         apollo-server-testing \
         bcrypt \
         cors \
         eslint \
         eslint-config-prettier \
         eslint-plugin-prettier \
         express \
         express-graphql \
         express-session \
         graphql-tools \
         graphql@^14.0.0 \
         jest \
         mysql2 \
         nodemon \
         prettier \
         reflect-metadata \
         supertest \
         ts-jest \
         ts-node \
         tsconfig-paths \
         type-graphql@^0.17.0 \
         typescript

ENV APP_HOME /home/node/app
USER root
CMD /usr/bin/supervisord -nc /etc/supervisor/supervisord.conf

