# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from the `lib/` directory:

```bash
npm install           # install dependencies
npm run build         # compile to dist/ (ESM + CJS + .d.ts via vite + vite-plugin-dts)
npm test              # unit tests in watch mode
npm run test:integration  # integration tests (hits live BBC API; requires VITE_API_KEY env var)
```

Run a single test file:
```bash
npx vitest run test/unit/query-builder.test.ts
```

## Architecture

This is a single npm package (`bbc-sound-fx-api`) published from `lib/`. There is no monorepo tooling — the root holds only docs and CI config.

### Builder pattern via mixins

`BBCFxRequestBuilder` is composed from multiple mixin classes rather than a deep inheritance chain. Each builder mixin (`CategoryQueryBuilder`, `LocationQueryBuilder`, `DurationQueryBuilder`) is a function that accepts a base constructor and returns an extended class. They all operate on the `criteria: BBCFxCriteria` object defined in `QueryBuilder`.

```
QueryBuilder (base)
  └─ CategoryQueryBuilder(QueryBuilder)
       └─ LocationQueryBuilder(...)
            └─ DurationQueryBuilder(...)  ← BBCFxRequestBuilder extends this
```

New filter types follow this pattern: define an interface in `builders/interfaces/`, implement it as a mixin function in `builders/`, then add it to the chain in `bbc-fx-request-builder.ts`.

### Build output

Vite builds two formats from `src/index.ts`:
- `dist/bbc-sound-fx-api.js` — ESM
- `dist/bbc-sound-fx-api.cjs` — CJS
- `dist/index.d.ts` / `dist/index.d.cts` — types (the `.cts` is copied from `.d.ts` post-build)

### Tests

Unit tests stub `fetch` globally (see `test/unit/setup.ts`) using a fixture from `test/unit/fixtures/search-response.json`. Integration tests hit the live BBC Sound Effects API and need `VITE_API_KEY` set.

### Release workflow

Releases are triggered by pushing a `release/vX.Y.Z` branch. CI extracts the version from the branch name, sets it in `package.json`, builds, and publishes to npm.
