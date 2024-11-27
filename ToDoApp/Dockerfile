FROM node:18.17.1-alpine3.18

RUN addgroup app && adduser -S -G app app
USER app

WORKDIR /app
RUN mkdir data
COPY package*.json .
RUN npm install
COPY . .
ENV API_URL=http://api.myapp.com/
EXPOSE 5173

CMD npm run dev -- --host


