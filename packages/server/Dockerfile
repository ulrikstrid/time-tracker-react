FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install

EXPOSE 4001

ADD tsconfig.json /usr/src/app
ADD src /usr/src/app/src

RUN npm run tsc

CMD [ "npm", "run", "dev" ]