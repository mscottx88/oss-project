# This Dockerfile contains the instructions to create a docker image that will
# launch our application.

# To prevent our SSH key from being discovered in the image, use an intermediary
FROM node:10.9.0 AS intermediate
ARG SSH_PRIVATE_KEY

# These commands make it possible to successfully open an SSH tunnel with Github
RUN mkdir /root/.ssh
RUN echo "${SSH_PRIVATE_KEY}" > /root/.ssh/id_rsa
RUN chmod 600 /root/.ssh/id_rsa
RUN touch /root/.ssh/known_hosts
RUN ssh-keyscan -t rsa github.com >> /root/.ssh/known_hosts

# Install the application into the intermediary
WORKDIR /usr/src/app
COPY src ./src
COPY package-lock.json .
COPY package.json .
COPY tsconfig.json .
RUN npm install

# Compile the application and remove dev dependencies
RUN npm run compile
RUN npm prune --production

# We can now create the final image, copying the installed contents from
# the intermediary, thereby leaving behind all traces of our SSH key
FROM node:10.9.0
ARG port
WORKDIR /usr/src/app
COPY --from=intermediate /usr/src/app .
EXPOSE $port
CMD npm start
