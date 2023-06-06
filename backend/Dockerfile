FROM node:14-alpine

ENV DOCKER_ENV=true

WORKDIR /backend

COPY . .

RUN npm install

EXPOSE 3000

CMD ["node", "src/index.js"]

# docker build -t backend .
#docker run -d -p 3000:3000 --name jioeva_b backend
# docker system prune --all --volumes
