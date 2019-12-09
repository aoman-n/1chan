FROM node:12.2.0-alpine
RUN mkdir /frontend-app
WORKDIR /frontend-app
COPY ./src/front/package*.json /frontend-app

ENV PATH /frontend-app/node_modules/.bin:$PATH

RUN yarn install --silent
COPY ./src/front/ /frontend-app

CMD ["yarn", "start"]