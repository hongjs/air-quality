# Stage 1: Build Stage
FROM node:18-alpine AS build

ENV NODE_ENV=production

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn add ts-node
RUN yarn install --production --frozen-lockfile

COPY . .

RUN yarn build

# Stage 2: Production Stage
FROM node:18-alpine

WORKDIR /app

COPY --from=build /app/package.json /app
COPY --from=build /app/yarn.lock /app
RUN yarn install --production --frozen-lockfile

COPY --from=build /app/dist /app

CMD ["node", "index.js"]