FROM node:14.15.5 AS ui-build
WORKDIR /home/app
COPY . /home/app/
RUN cd /home/app/ && npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]