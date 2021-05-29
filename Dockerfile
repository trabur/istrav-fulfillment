FROM node:14

WORKDIR /usr/src/app
RUN pwd

COPY . .
RUN git submodule update --init --recursive
RUN cd farmerless && npm install

RUN npm install
RUN npm run build

EXPOSE 5000
CMD [ "npm", "start" ]
