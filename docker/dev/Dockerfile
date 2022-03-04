FROM node:16.13.0-slim AS ui-build
WORKDIR /home/app
COPY . /home/app/
RUN cd /home/app/ && npm install


EXPOSE 3000

CMD ["npm", "run", "dev"]