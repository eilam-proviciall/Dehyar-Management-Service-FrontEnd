FROM ubuntu:20.04

# Install required packages
RUN apt-get update && apt-get install -y curl ca-certificates bash build-essential

# Set NVM directory and create it
ENV NVM_DIR /usr/local/nvm
RUN mkdir -p $NVM_DIR

# Install NVM
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash -x

# Source NVM and install Node
ENV NODE_VERSION 20.12.2
RUN . $NVM_DIR/nvm.sh && nvm install $NODE_VERSION
RUN . $NVM_DIR/nvm.sh && nvm use $NODE_VERSION
RUN . $NVM_DIR/nvm.sh && nvm alias default $NODE_VERSION

# Set PATH
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
RUN npm build
CMD ["npm", "start"]