# --- Build the app ---
FROM node:22-alpine AS build
COPY . /usr/src/fabriquepar
WORKDIR /usr/src/fabriquepar

RUN npm install
RUN npm run build

# --- Run the app ---
FROM nginx:1.25.5
COPY --from=build /usr/src/fabriquepar/dist usr/share/nginx/html/fabriquepar
COPY --from=build /usr/src/fabriquepar/configuration/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80