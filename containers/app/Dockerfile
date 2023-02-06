FROM node:18-alpine
# Create app directory
WORKDIR /usr/src/app

RUN npm i -g nodemon sequelize-cli
COPY package*.json ./
RUN npm install
# Copy in the source code
COPY . .

# Don't use root user
# USER node
EXPOSE 3600

CMD ["nodemon", "task-master.js"]