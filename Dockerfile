FROM node:latest
VOLUME /tmp:/tmp
RUN mkdir -p /srv
WORKDIR /srv
COPY ./server /srv
RUN cd /srv && npm install
ENV TZ=Asia/Shanghai
ENV SERVICE_3000_NAME chat
EXPOSE 3000
ENTRYPOINT ["npm", "start"]
