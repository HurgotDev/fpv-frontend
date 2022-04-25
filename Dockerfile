FROM node:lts

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install --fronzen-lockfile

COPY . .
RUN yarn build

ENV NODE_ENV production
EXPOSE 3000
CMD ["yarn", "start"]