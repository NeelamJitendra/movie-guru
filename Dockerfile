FROM node:17-alpine
RUN apk update
RUN apk add wget
RUN apk add git
RUN git clone https://github.com/NeelamJitendra/movie-guru.git
RUN mv movie-guru /usr/ticket-app/
WORKDIR /usr/ticket-app/
RUN npm install
COPY . ./
CMD ["npm", "start"]
