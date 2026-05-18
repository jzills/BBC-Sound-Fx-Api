# BBC-Sound-Fx-Api

[![NPM Version](https://img.shields.io/npm/v/bbc-sound-fx-api)](https://www.npmjs.com/package/bbc-sound-fx-api) [![NPM Downloads](https://img.shields.io/npm/d18m/bbc-sound-fx-api)](https://www.npmjs.com/package/bbc-sound-fx-api)

A TypeScript client library for the [BBC Sound Effects](https://sound-effects.bbcrewind.co.uk/) API.

## Installation

```bash
npm install bbc-sound-fx-api
```

## Usage

```typescript
import { BBCFx, BBCFxRequestBuilder } from "bbc-sound-fx-api";

const bbc = new BBCFx();

// Search for sound effects
const results = await bbc.search(
    new BBCFxRequestBuilder()
        .withQuery("thunder")
        .withCategory("Nature")
        .withDuration("10-30")
        .withSize(25)
);

console.log(results.hits.hits);

// Get a download URL
const url = bbc.getDownloadUrl(results.hits.hits[0]._source, "mp3");

// Browse by category
const birds = await bbc.browse("Birds");

// Fetch available categories, continents, and durations
const categories = await bbc.categories();
const continents = await bbc.continents();
const durations = await bbc.durations();
```

## API

### `BBCFx`

```typescript
const bbc = new BBCFx();
bbc.search(builder: QueryBuilder): Promise<BBCFxResponse>
bbc.browse(category: BBCCategory): Promise<BBCFxResponse>
bbc.cachedSearch(query: string): Promise<BBCFxResponse>
bbc.categories(): Promise<AggregationResponse>
bbc.continents(): Promise<AggregationResponse>
bbc.durations(): Promise<AggregationResponse>
bbc.getDownloadUrl(sound: BBCSound, format: "mp3" | "wav"): string
```

### `BBCFxRequestBuilder`

Fluent builder for constructing search queries. All methods return `this` for chaining.

#### Query & Pagination

| Method | Description |
|---|---|
| `.withQuery(value)` | Full-text search term |
| `.withSize(value)` | Number of results to return |
| `.withFrom(value)` | Offset for pagination |
| `.withSortBy(value)` | Sort field |

#### Category

| Method | Description |
|---|---|
| `.withCategory(value)` | Filter by a single `BBCCategory` |
| `.withCategories(values)` | Filter by multiple `BBCCategory` values |

#### Location

| Method | Description |
|---|---|
| `.withContinent(value)` | Filter by a single `BBCContinent` |
| `.withContinents(values)` | Filter by multiple `BBCContinent` values |

#### Duration

| Method | Description |
|---|---|
| `.withDuration(value)` | Filter by a single `BBCDuration` range |
| `.withDurations(values)` | Filter by multiple `BBCDuration` ranges |

### Types

**`BBCCategory`** — `"Nature"` | `"Bells"` | `"Destruction"` | `"Daily_Life"` | `"Electronics"` | `"Crowds"` | `"Birds"` | `"Industry"` | `"Footsteps"` | `"Toys"` | `"Sport"` | `"Animals"` | `"Events"` | `"Applause"` | `"Atmosphere"` | `"Fire"` | `"Medical"` | `"Comedy"` | `"Transport"` | `"Machines"` | `"Aircraft"` | `"Military"` | `"Clocks"`

**`BBCContinent`** — `"Europe"` | `"Asia"` | `"North America"` | `"South America"` | `"Africa"` | `"Antarctica"` | `"Oceania"`

**`BBCDuration`** — `"0-9"` | `"10-30"` | `"30-60"` | `"60-120"` | `"120-300"` | `"300-600"` | `"600-3600"`

## Development

```bash
cd lib
npm install
npm run build       # compile to dist/
npm test            # unit tests (vitest)
npm run test:integration  # integration tests
```
