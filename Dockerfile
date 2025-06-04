
FROM node:22.13.1-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --silence

COPY prisma ./prisma
COPY public ./public

RUN yarn prisma:client:generate

COPY src ./src
COPY nest-cli.json tsconfig.json tsconfig.build.json ./

RUN yarn build

FROM node:22.13.1-alpine AS runner

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --silence
RUN yarn --frozen-lockfile --production --silent

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["sh", "-c", "yarn prisma:migrate:prod && yarn start:prod"]

# # ③ Static (nginx)
# FROM nginx:alpine AS static
# COPY --from=builder /app/public /usr/share/nginx/html
