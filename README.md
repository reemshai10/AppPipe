

nodejs backend with express module
mongodb for data storage

All components are docker-based

With Docker

To start the application

Step 1: Create docker network

docker network create mongo-network 

Step 2: start mongodb

docker run -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=example --name mongodb --net mongo-network mongo    

Step 3: start mongo-express

docker run -d -p 8081:8081 -e ME_CONFIG_MONGODB_ADMINUSERNAME=root -e ME_CONFIG_MONGODB_ADMINPASSWORD=example --net mongo-network --name mongo-express -e ME_CONFIG_MONGODB_SERVER=mongodb mongo-express   

NOTE: creating docker-network in optional. You can start both containers in a default network. In this case, just emit --net flag in docker run command

Step 4: open mongo-express from browser

http://localhost:8081

Step 5: create user-account db and users collection in mongo-express

Step 6: Start your nodejs application locally - go to app directory of project

npm install 

node server.js

Step 7: Access you nodejs application UI from browser

http://localhost:3001

With Docker Compose

To start the application

Step 1: start mongodb and mongo-express

docker-compose -f mongo.yaml up

You can access the mongo-express under localhost:8081 from your browser

Step 2: in mongo-express UI - create a new database "AppPipe"

Step 3: in mongo-express UI - create a new collection "accounts" in the database "AppPipe"

Step 4: start node server

npm install

node server.js

Step 5: access the nodejs application from browser

http://localhost:3001

To build a docker image from the application

docker build -t my-app:1.2 .       

The dot "." at the end of the command denotes location of the Dockerfile.

