FROM node:18-alpine

WORKDIR /home/app

COPY . ./

RUN npm i 

EXPOSE 3335

CMD ["npm", "run", "dev" ]