FROM node:13-alpine

ENV MONGO_DB_USERNAME=root \
    MONGO_DB_PWD=example

RUN mkdir -p /home/app

COPY . /home/app

# set default dir so that next commands executes in /home/app dir
WORKDIR /home/app

# will execute npm install in /home/app because of WORKDIR
RUN npm install

EXPOSE 3001
#exposing the port which our application runs on


# no need for /home/app/server.js because of WORKDIR
CMD ["node", "server.js"]
