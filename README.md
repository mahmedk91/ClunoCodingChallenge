# ClunoCodingChallenge

Solution for the Cluno coding challenge

## Cluno backend project setup

Requirements -

- NodeJS 12.x and npm
- Docker
- AWS SAM - https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html

```
cd lamdba_functions
npm install
```

### Compiles and start app in development env

```
cd lamdba_functions
npm run build
cd ..
sam local start-api
```

### Run tests

There are a couple of tests you can run with

```
cd lamdba_functions
npm run test
```

## Cluno frontend project setup

Requirements -

- yarn

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Lints and fixes files

```
yarn run lint
```

## Additional libaries used and reason

- Vue Slider - https://github.com/NightCatSama/vue-slider-component - A vue component for making min-max price range slider. Its pretty common, have good star ratings and support, quite customisable and easy to integrate.
- Vue Toggle button - https://github.com/euvl/vue-js-toggle-button - Vue component for making toggle of price sorting. Highly customisable toggle button with an easy driving mechanism.
- Bootstrap - To make cards for the list view. I am already familiar with boostrap cards and figured this would save time in design.
