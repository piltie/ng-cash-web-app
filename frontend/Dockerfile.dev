FROM node:18.12.1-alpine
EXPOSE 8080 
RUN mkdir -p /app/public /app/src
WORKDIR /app
COPY tsconfig.json /app/tsconfig.json 
COPY package.json /app/package.json
COPY vite.config.ts /app/vite.config.ts
COPY tsconfig.node.json /app/tsconfig.node.json
RUN npm install
CMD ["npm", "run", "dev"]