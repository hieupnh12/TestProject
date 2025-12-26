# ========================
# Build stage
# ========================
FROM maven:3.9-eclipse-temurin-24 AS build
WORKDIR /app

# Cache dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy source & build
COPY src ./src
RUN mvn clean package -DskipTests

# ========================
# Runtime stage
# ========================
FROM eclipse-temurin:24-jre-alpine
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-Xmx512m", "-Xms256m", "-jar", "app.jar"]