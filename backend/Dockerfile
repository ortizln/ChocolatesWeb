FROM openjdk:21-jdk-slim AS build
WORKDIR /app
COPY mvnw pom.xml ./
COPY .mvn .mvn
RUN apt-get update && apt-get install -y dos2unix && dos2unix mvnw && chmod +x mvnw
RUN ./mvnw dependency:resolve -DskipTests
COPY src src
RUN ./mvnw package -DskipTests

FROM openjdk:21-jdk-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]