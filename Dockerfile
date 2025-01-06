# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Install dependencies
# Copy package.json and package-lock.json (or yarn.lock) first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Install nodemon globally for development
RUN npm install -g nodemon

# Expose the port the app runs on
EXPOSE 3000

# Start the application using nodemon for live-reloading
CMD ["nodemon", "--watch", "src", "--exec", "npm run start:dev"]
