# Stocks App

## The Application

The app allows a user to subscribe/unsubscribe to a list of stocks. The user can subscribe to a stock by entering its ISIN number into an input and then see the current price, the lowest price and the highest price of the stock displayed in a watch list. The user is not allowed to subscribe the same ISIN. The input field renders an error if it happens or if the ISIN number is not valid. If the server disconnects and the data is not up to date the app will show an error message banner to warn the user.

---

### Installation

To install the dependencies:

```bash
$ npm install
```

To start the development server and also the WebSocket server on port 8425:

```bash
$ npm run dev
```

To visit the app running locally:

```
http://localhost:3000
```

To run tests:

```bash
$ npm run test
```

To open tests UI dashboard:

```bash
$ npm run test:ui
```

---

### Technologies used:

- [Vite](https://vitejs.dev/): a frontend tooling to build the app that provides a faster and leaner development experience.

- [React](https://reactjs.org/): a component-based JavaScript library for building user interfaces that uses declarative and functional concepts.

- [TypeScript](https://www.typescriptlang.org/): as a strongly typed programming language that builds on JavaScript.

- [RxJs](https://rxjs.dev/): a library for composing asynchronous and event-based programs by using observable sequences.

- [clsx](https://github.com/lukeed/clsx#readme): a utility for constructing className strings conditionally.

- [SASS](https://sass-lang.com/): as a pre-processor scripting language that is compiled or interpreted into CSS.

- [Vitest](https://vitest.dev/): a Vite-native unit test framework. Vitest supports HMR which really speeds up your workflow.

- [Testing Library](https://testing-library.com/): a simple and complete testing utilities that encourage good testing practices.

---

### Folders organization

- `components`: contains sub-components of pages. They either break down the functionality of such pages, or are extracted for code reuse between different pages.

- `pages`: contains the app's pages. These are the top-level components in the hierarchy and contain the main logic to render the sub-components.

- `context`: contains the provider file to the WebSocket error conection.

---

### Tests

I wrote tests for:

- `Button`
- `TextField`
- `StockCard`

StockCard is the most "complex" of them because I needed to mock the WebSockt connection and mimic some RxJs behavior by mocking it.

---
