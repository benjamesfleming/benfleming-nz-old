FROM node:alpine AS builder

RUN apk --update --no-cache \
  add  \
  automake \
  git \
  alpine-sdk  \
  nasm  \
  autoconf  \
  build-base \
  zlib \
  zlib-dev \
  libpng \
  libpng-dev\
  libwebp \
  libwebp-dev \
  libjpeg-turbo \
  libjpeg-turbo-dev

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run generate

FROM caddy:2

WORKDIR /usr/share/caddy

COPY --from=builder /app/dist .
