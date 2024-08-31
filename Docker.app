#Set the baseImage to use for subsequent instructions. FROM must be the first instruction in a Dockerfile.
FROM public.ecr.aws/docker/library/node:16.19.1-buster-slim as yarn-build

ARG CICD_USER_PAT
# Set the /app directory as the working directory for any command that follows
WORKDIR /app
# Copy the local app package and package-lock.json file to the container
COPY --chown=node:node package.json ./
COPY --chown=node:node yarn.lock ./
COPY --chown=node:node src ./src/
COPY --chown=node:node .npmrc .
COPY --chown=node:node public ./public/


RUN echo
RUN echo //npm.pkg.github.com/:_authToken=${CICD_USER_PAT} >> .npmrc
RUN echo //npm.pkg.github.com/unifo/:_authToken=${CICD_USER_PAT} >> .npmrc
RUN echo //npm.pkg.github.com/download/@unifo/:_authToken=${CICD_USER_PAT} >> .npmrc

RUN yarn install

COPY --chown=node:node /.env /app
 
RUN yarn build
#COPY --chown=node:node build ./build/


FROM public.ecr.aws/nginx/nginx:mainline as image-build
COPY ./src/webapp/.nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=yarn-build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

