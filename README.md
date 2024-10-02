# Docs

> **Note**: This solution has been tested on expo web.

> **Note**: Needed to use `yarn` here due to issues with `@testing-library`.

## Goal

The goal was to make this solution review-ready, not production-ready.

## Quick start

### Running the app

**Before you attempt to run anything make sure you have those things installed on your machine**:

```sh
# Developed and tested on Ubuntu (couldn't use Mac for it) with
node v >= 20.9.0
yarn v >= 1.22.17
```

To run react-native app **_in the browser_**:

```sh
$ yarn
$ yarn start
# the app is running on http://localhost:8081
```

To run tests:
```sh
$ yarn test
```

## Implementation

### Ideas

- make the app as simple as possible: care about functionality, not visuals or files structure;
- use zod to validate external data structure (as we don't actually know it in the runtime);
- prefetch data where possible (i.e. prefetch position list even if it's visually hidden);
- use UI-agnostic(-ish), **data-aware** components (placed under `views/` folder) whose only job is to retrieve and pass the data;
- since I'm not fluent in RN I needed to isolate react-native specific code as much as possible;
  - the RN code is placed under `app/`, `components/` and `styles/`; **data-aware** components placed under `views/` could be used along with pure react components (the UI component is not injectable though);

### Trade-offs

- used expo framework;
- zero attention to performance;
- no data pagination (app prepared to handle infinite scrolling);
- no actual state management which could work as cache or help to separate visual components from the logic even more;
- no fancy UI, no fancy animation, no themes, or colors management;
- visual glitches are fine as long as they don't break functionality;
- to match the spec I didn't have time to leverage any cool device specific API;
- external data validation could be better (more error cases covered);
- basic tests;
