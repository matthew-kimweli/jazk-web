# Use the specified Node.js image as a base
FROM node:20



# Set up the working directory for your application
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Copy the rest of the application code to the container
COPY . .

# Install dependecies
RUN npm run install-node

# Build the NestJS app
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Command to run the app
CMD ["npm", "run", "start:prod"]
