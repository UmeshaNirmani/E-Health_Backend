FROM node:14.17.5

WORKDIR /

COPY . .

RUN npm install 

CMD [ "npm", "start" ]

EXPOSE 4000