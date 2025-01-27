# OverCast

OverCast is a Weather application that displays weather information of any city in the world.
You type the city, and it will suggest different cities according to the typed text, and after selecting one of those,
you'll get nice widgets with helpful weather data.

## App Features

- You get suggestions when typing the city name
- You can choose units in the Imperial or Metric systems
- You can add and remove cities from Favorites, which get persisted
- The background of the app changes according to the current city's weather conditions.
- The app is 100% keyboard-navigable and has accessibility practices
- The app as a responsive design

## Development features

- Unit tests for small components using jest and React Testing Library
- End-to-end tests for the main workflows using Cypress
- Prettier for code formatting
- ESLint for code quality
- TypeScript for type safety and Intellisense

## Tech stack

- [React](https://react.dev) as the main JavaScript Framework
- [Tanstack Query](https://tanstack.com/query/latest) (previously React Query) (For fetching data and caching)
- [React Router](https://reactrouter.com) (For managing routes and navigation)
- [Prettier](https://prettier.io) (For code formatting)
- [ESLint](https://eslint.org) (For spotting code quality issues)
- [Vite](https://vite.dev) (For running and building the project)
- [TypeScript](https://www.typescriptlang.org) (For type safety and Intellisense)
- [Jest](https://jestjs.io) (For running unit tests)
- [Testing Library](https://testing-library.com) (For writing React tests more easily)
- [Cypress](https://www.cypress.io) (For writing and running End-to-end tests)
- [Material UI](https://mui.com) (As a React component library)
- [StyledComponents](https://styled-components.com) (To style React components)

# Running the app in development

- Run `npm install` at the root of the project
- Run `npm run dev` to run the local server

To build the app for production:
- Run `npm run build`
- Run `npm run preview` to preview the production build

To run the unit tests:
- Run `npm run test:unit`

To run the End-to-end tests:
- Run `npm run test:e2e` and follow the instructions