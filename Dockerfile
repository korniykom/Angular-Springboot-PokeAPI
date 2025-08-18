FROM node:20-alpine AS frontend-build

WORKDIR /app

RUN apk add --no-cache git

RUN git clone https://github.com/korniykom/Angular-Springboot-PokeAPI.git .

WORKDIR /app/frontend/

RUN npm install -g @angular/cli

RUN npm i && ng build --configuration production --base-href /poke-api/


FROM gradle:8-jdk21 AS backend-build

WORKDIR /app

COPY --from=frontend-build /app/backend/ .

COPY --from=frontend-build /app/frontend/dist/poke-api/browser /app/Angular-Springboot-PokeAPI/backend/src/main/resources/static/poke-api

RUN chmod +x gradlew && ./gradlew build -x test --no-daemon


FROM openjdk:21-jdk-slim AS runtime

WORKDIR /app

COPY --from=build-stage /app/Angular-Springboot-PokeAPI/backend/build/libs/spring-boot-proxy-server-0.0.1-SNAPSHOT.jar app.jar
 
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]