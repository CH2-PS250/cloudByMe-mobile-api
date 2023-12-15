FROM node:14.21.2-alpine
WORKDIR /app
ENV PORT 4000
COPY . .
RUN npm install
EXPOSE 4000
CMD [ "npm", "run", "start"]