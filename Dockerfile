# Stage 1: Build the React app
FROM node:18 AS build

# Set the working directory
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the app with a static server (nginx)
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 3001
CMD ["nginx", "-g", "daemon off;"]
