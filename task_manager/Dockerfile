FROM gradle:7.4-jdk17 as build
WORKDIR /home/gradle/project
COPY --chown=gradle:gradle . /home/gradle/project
ENV SPRING_PROFILES_ACTIVE=test
RUN  gradle bootJar --no-daemon --stacktrace


FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /home/gradle/project/build/libs/*.jar /app/spring-boot-application.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/spring-boot-application.jar"]