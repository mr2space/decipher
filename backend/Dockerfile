FROM node
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
RUN npm install
COPY . /app
EXPOSE 7000
CMD ["node","server.js"]