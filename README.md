Viz-house is the charting library that powers the Sql Console and Control Plane charts. It uses Highcharts under the hood. It is a yarn project that uses storybook and vite.

## Prerequisites

- You must have [yarn](https://classic.yarnpkg.com/lang/en/docs/install/) installed

## Setup

1. Install dependencies
1. Build

## Dev

1. Run tests
1. Run Storybook
1. Run in dev mode
1. Run tests in watch mode

## Install dependencies

```sh
yarn
```

done.

## Build

```sh
yarn build
```

This will create the `dist` directory. The `index.js` file is the exported library built and minified.

## Run tests

```sh
yarn test
```

## Run Storybook

```sh
yarn storybook
```

## Run in dev mode

```sh
yarn dev
```

dev mode will watch for changes and rebuild the project when changes are detected. There is a sample application with a number of charts, that will be available at http://localhost:5174/. If port 5174 is in use, it will increment the port until one is available.

## Run tests in watch mode

```sh
yarn test:watch
```

This will run tests in watch mode, which will let you develop while running tests. Tests will automatically re-run after changes. We use vitest, which has a similar interface and commands to jest.
