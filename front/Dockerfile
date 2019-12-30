FROM node:12.14.0-alpine as devtools

RUN apk add git g++ gcc libgcc libstdc++ linux-headers make python \
  && npm install npm@latest -g \
  && npm install node-gyp -g
WORKDIR /app
COPY package.json package-lock*.json /app/
RUN npm install

FROM node:12.14.0-alpine as base
WORKDIR /app
COPY --from=devtools /app/node_modules /app/node_modules
COPY ./ /app
EXPOSE 3000

# Develop Image
FROM base as development
ENV NODE_ENV=development
ENV PATH=/app/node_modules/.bin:$PATH
CMD ["npm", "run", "dev"]

# # Production Image
FROM base as production
ENV NODE_ENV=production
ENV PATH=/app/node_modules/.bin:$PATH
RUN npm run build
CMD ["node", "dist/index.js"]