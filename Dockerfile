# Dockerfile for React Admin
FROM node:18

# Set the working directory
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Serve the app with a static server (nginx)
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 3001
CMD ["nginx", "-g", "daemon off;"]
