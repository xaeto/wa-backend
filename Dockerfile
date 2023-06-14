FROM node:18

WORKDIR /usr/wa/

COPY package*.json ./

RUN npm install
RUN npm ci --omit=dev

COPY . .

EXPOSE 3000
CMD [ "node", "./src/server.js" ]
