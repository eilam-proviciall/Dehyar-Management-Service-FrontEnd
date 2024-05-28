# Base image for building
FROM node:18-alpine AS base

# Install necessary packages
RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Copy the rest of the files to ensure all necessary files are present
COPY . .

# Ensure the directory exists and the file is present
RUN ls -la src/assets/iconify-icons

# Install dependencies
RUN npm install

# Install tsx globally to use it in build scripts
RUN npm install -g tsx

# Run the icon build script
RUN npm run build:icons

# Build the Next.js project
RUN npm run build

# Production image
FROM node:18-alpine AS runner

WORKDIR /app

# Set environment variables
ENV NODE_ENV production

# Copy built assets from the build stage
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/package-lock.json ./package-lock.json
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public

# Expose the necessary port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
