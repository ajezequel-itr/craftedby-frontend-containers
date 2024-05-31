# --- Build the app ---
FROM node:22-alpine AS build
COPY . /usr/src/fabriquepar
WORKDIR /usr/src/fabriquepar
ARG APP_URL=localhost

# Create .env file
RUN echo "VITE_API_ENDPOINT=\"http://${APP_URL}/api\"" > .env && \
    echo "VITE_IMAGE_BASE_URL=\"http://{$APP_URL}\"" >> .env && \
    echo "VITE_STRIPE_KEY=pk_test_PZ5P8UpDWL0CqulY6YJjRzGo00vQtn1Ff3" >> .env && \
    echo "VITE_STRIPE_SECRET=sk_test_sgFQbF0KnQt7Me5J852syFSJ00GklPEL7C" >> .env

RUN npm install
RUN npm run build

# --- Run the app ---
FROM nginx:1.25.5
COPY --from=build /usr/src/fabriquepar/dist usr/share/nginx/html/fabriquepar
COPY --from=build /usr/src/fabriquepar/configuration/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80