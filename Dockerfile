FROM node:20-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Copy built files into mounted volume at runtime
CMD cp -r /app/dist/* /output/