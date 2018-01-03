FROM node:latest
RUN mkdir -p /app
WORKDIR /app
COPY . /app
RUN npm install
CMD node app.js
EXPOSE 8080
