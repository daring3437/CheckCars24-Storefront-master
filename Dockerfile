FROM node:12.18.3-alpine3.9

WORKDIR /usr/src/app/

COPY  dist dist/

ENV PORT 4000


EXPOSE 4000  

CMD [ "node", "dist/check-cars-shop/server/main.js" ]