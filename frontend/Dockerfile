# Stage 1: Build React App
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files first
# This helps Docker cache npm dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the frontend source code
COPY . .

# Build React + TypeScript + Vite application
RUN npm run build


# =========================
# Stage 2: Nginx
# =========================
FROM nginx:alpine AS production

# Remove default Nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy React production build
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTP port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]