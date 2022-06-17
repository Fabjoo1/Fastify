FROM node:v16.15.1

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
# Wildcard for all packages.son and package-lock.json
COPY package*.json ./

RUN npm Install 

# install dependeies for production
# RUN npm ci --only=production


#Bundle app source
COPY . .

EXPOSE 8080

CMD ["npm", "start"]




