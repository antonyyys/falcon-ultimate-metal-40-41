FROM node:20-slim
RUN apt-get update && apt-get install -y ffmpeg openssl ca-certificates python3 make g++ --no-install-recommends && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 7860
CMD ["node", "index.js"]
