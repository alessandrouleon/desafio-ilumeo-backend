FROM node:lts-alpine as production

ARG NODE_ENV
ARG PORT

ENV NODE_ENV=${NODE_ENV}
# ENV PORT=${DOCKER_PORT}

WORKDIR /usr/app

ENV TZ=America/Manaus
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Defina o nome da migração como uma variável de ambiente
ENV MIGRATION_NAME=my_migration_name

COPY package*.json ./

RUN npm install --only=production --silent

COPY . .
COPY ./prisma prisma

RUN npx prisma generate

# Execute a migração sem interação do usuário
RUN npx prisma migrate dev --name $MIGRATION_NAME

EXPOSE ${PORT}

CMD ["node", "dist/main"]
