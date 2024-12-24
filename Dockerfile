# Use the official Node.js image as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files into the container
COPY . .

# Expose the port that the application will run on (default for most Node.js apps)
EXPOSE 5137

# Specify the command to run the application
CMD ["npm", "run", "dev"]
