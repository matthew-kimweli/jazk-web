# # Use the specified Node.js image as a base
# FROM node:20-slim


# # Set up the working directory for your application
# # WORKDIR /usr/src/app
# WORKDIR /app

# # Copy package.json and package-lock.json to the container
# COPY package*.json ./


# # Install dependecies
# RUN npm run install-node

# # Copy the rest of the application code to the container
# COPY . .

# # Build the NestJS app
# RUN npm run build


# # Expose the port your app runs on
# EXPOSE 3100

# # Command to run the app
# CMD ["npm", "run", "start:prod"]


FROM node:20-slim AS base
WORKDIR /usr/app

FROM base AS build
COPY package*.json ./
RUN npm run install-node
COPY . ./
RUN npm run build

FROM base
RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*


COPY --from=build /usr/app ./
ENV PATH /usr/app/node_modules/.bin:$PATH
# Expose the port your app runs on
EXPOSE 3100

# Command to run the app
CMD ["npm", "run", "start:prod"]
