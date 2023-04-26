FROM node:14.18.0-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --only=prod

# Copy app files
COPY . .

# Expose port 3000
EXPOSE 3022

# Set environment variables
ENV MONGO_URI=mongodb://mongodb:27017/flashcards
ENV NODE_ENV=production

# Start app
CMD ["npm", "start"]
