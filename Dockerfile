# Base image for Node.js
FROM node:20.12-alpine

# Set working directory inside container
WORKDIR /usr/src/app

# Copy package files for dependency installation
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy all project files
COPY . .

# Expose API port
EXPOSE 3000

# Start application in development mode with auto-reload
CMD ["npm", "run", "dev"]
