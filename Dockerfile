# Use the specified Node.js image as a base
FROM node:20@sha256:a4d1de4c7339eabcf78a90137dfd551b798829e3ef3e399e0036ac454afa1291

# Configure default locale (important for chrome-headless-shell)
ENV LANG en_US.UTF-8

# Install latest chrome dev package and fonts to support major charsets
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        fonts-ipafont-gothic \
        fonts-wqy-zenhei \
        fonts-thai-tlwg \
        fonts-khmeros \
        fonts-kacst \
        fonts-freefont-ttf \
        dbus \
        dbus-x11 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Add pptruser
RUN groupadd -r pptruser && useradd -rm -g pptruser -G audio,video pptruser

USER pptruser

WORKDIR /home/pptruser

ENV DBUS_SESSION_BUS_ADDRESS autolaunch:

# Install @puppeteer/browsers, puppeteer, and puppeteer-core
RUN npm i @puppeteer/browsers puppeteer

# Install system dependencies for Puppeteer
USER root
RUN npx puppeteer browsers install chrome --install-deps

USER pptruser

# Generate THIRD_PARTY_NOTICES using chrome --credits
RUN node -e "require('child_process').execSync(require('puppeteer').executablePath() + ' --credits', {stdio: 'inherit'})" > THIRD_PARTY_NOTICES

# Set up the working directory for your application
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install --production

# Copy the rest of the application code to the container
COPY . .

# Build the Angular project
RUN cd jazk-angular && ng build

# Copy the Angular build files to the public folder
RUN cp -r jazk-angular/dist/jazk/browser/* public/

# Build the NestJS app
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Command to run the app
CMD ["npm", "run", "start:prod"]
