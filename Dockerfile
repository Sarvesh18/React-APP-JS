From node:lts as node
MAINTAINER Sarvesh Singh sarvesh.singh18@hotmail.com
WORKDIR /opt/

COPY package.json .

RUN npm cache clean --force
RUN npm install

COPY . .

RUN npm run build

RUN cd dist && ls
#RUN npm run start

#EXPOSE 9000:9000
#VOLUME [""]
#ENTRYPOINT ["index.js"]
#CMD ["node", "index.js"]

FROM nginx:latest
LABEL maintainer="sarvesh.singh18@hotmail.com"
LABEL org.label-schema.build-date=$BUILD_DATE
LABEL org.label-schema.url=$SITE_NAME
LABEL org.label-schema.env=$ENVIRONMENT

#COPY --from=node /opt/dist/. /var/www/html/


COPY --from=node /opt/dist /usr/share/nginx/html/dist
COPY --from=node /opt/conf/nginx.conf /etc/nginx/conf.d/default.conf

#CMD ["nginx", "-g", "daemon off;"]
