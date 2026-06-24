FROM cypress/included:12.17.4

WORKDIR /e2e

COPY ./package.json ./package.json
COPY ./cypress.config.js ./cypress.config.js
COPY ./cypress ./cypress

ENTRYPOINT ["npx", "cypress", "run", "--browser", "firefox"]
