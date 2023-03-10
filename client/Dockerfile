FROM node:16.16.0

WORKDIR /project

COPY package.json /project

RUN npm install

COPY . /project

EXPOSE 3000

CMD ["npm", "run", "dev"]