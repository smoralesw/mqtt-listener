# Use an official Node runtime as a parent image
FROM node:16

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json ./
COPY yarn.lock ./

# Install app dependencies
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

EXPOSE 3001

# Start the app
CMD ["yarn", "start:dev"]
