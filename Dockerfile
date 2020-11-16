FROM node:12

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./
COPY docker.env ./.env

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "node","index.js" ]


FROM nginx:1.17-alpine

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]