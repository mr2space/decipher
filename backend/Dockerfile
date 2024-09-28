#FROM node:latest

#WORKDIR /static
#COPY * .
# RUN source venv/bin/activate.sh
#RUN pip install --no-cache-dir -r requirements.txt
#RUN npm install

#CMD ["npm", "run", "server.js"]




FROM node:latest

WORKDIR /app

COPY . .

RUN npm i

CMD ["node", "server.js"]

EXPOSE 8000:8000