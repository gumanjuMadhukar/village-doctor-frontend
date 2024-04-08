FROM node:18-alpine as deps

RUN     apk add git

WORKDIR /app

COPY package.json package-lock.json  ./

RUN npm ci

# Rebuild the source code only when needed
FROM node:18-alpine AS builder

RUN     apk add git

WORKDIR /app
ARG NEXT_PUBLIC_BASE_URL
# size in KB
ENV NEXT_PUBLIC_BASE_URL ${NEXT_PUBLIC_BASE_URL}

COPY . .
COPY --from=deps /app/node_modules ./node_modules

RUN npm run build

FROM node:16.13.0-alpine3.12 AS runner
WORKDIR /app

RUN apk upgrade busybox libcrypto1.1

ENV NODE_ENV production

COPY --from=builder  /app/node_modules ./node_modules
COPY --from=builder  /app/package.json ./package.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
EXPOSE 3000


