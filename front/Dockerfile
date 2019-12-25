# deevlopment
FROM node:12.14.0-alpine
RUN mkdir /app
WORKDIR /app
COPY ./ /app
ENV NODE_ENV=development
RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "dev" ]