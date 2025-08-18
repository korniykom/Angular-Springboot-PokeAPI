FROM alpine:latest as build-stage

RUN apk add --no-cache git openjdk21

WORKDIR /app

RUN git clone https://github.com/korniykom/Angular-Springboot-PokeAPI.git

WORKDIR /app/Angular-Springboot-PokeAPI/backend/

RUN chmod +x gradlew && ./gradlew build -x test --no-daemon



FROM alpine:latest AS runtime

RUN apk add --no-cache openjdk21-jre

WORKDIR /app

COPY --from=build-stage /app/Angular-Springboot-PokeAPI/backend/spring-boot-proxy-server/build/libs/spring-boot-proxy-server-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 1337

ENTRYPOINT ["java", "-jar", "app.jar"]