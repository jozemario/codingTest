FROM node:14.15.5 AS ui-build
WORKDIR /home/
COPY CodingTest/ ./CodingTest/
RUN cd CodingTest && npm install && npm run build

FROM node:14.15.5 AS server-build
WORKDIR /home/
COPY --from=ui-build /home/CodingTest/ ./CodingTest/

EXPOSE 3000

CMD ["npm", "run","build"]