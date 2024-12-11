# Use the official Node.js image as a base image
FROM node:18 AS build-stage

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) files to the working directory
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . ./

# Build the Vite app
RUN npm run build

# Use an Nginx image for the production stage
FROM nginx:alpine AS production-stage

# Copy the built files from the build stage to the Nginx default directory
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
