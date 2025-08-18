FROM node:20-alpine AS frontend-build

WORKDIR /app

RUN apk add --no-cache git

RUN git clone https://github.com/korniykom/Angular-Springboot-PokeAPI.git .

