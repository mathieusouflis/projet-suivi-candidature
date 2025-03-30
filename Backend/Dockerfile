FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN mkdir -p logs && chmod 777 logs

RUN apk add --no-cache wget

# Expose port
EXPOSE 3000

CMD ["npm", "run", "dev"]