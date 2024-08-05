# Use the official Node.js image as a build environment
FROM node:20 AS build

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular app
RUN npm run build -- --configuration production

# Use a lighter image for serving the app
FROM nginx:alpine

# Copy the build output to the Nginx directory
COPY --from=build /usr/src/app/dist/hello-world /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
