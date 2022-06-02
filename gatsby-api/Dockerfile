FROM node:14.17.6
WORKDIR /app
COPY . .
RUN npm install
RUN npm install -g gatsby-cli
ENTRYPOINT ["node", "./src/index.js"]
