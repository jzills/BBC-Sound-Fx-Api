import { assert, test } from "vitest";

import BBCFxRequestBuilder from "../../src/bbc-fx-request-builder.js";
import BBCFx from "../../src/bbc-fx.js";
import { lastFetchBody } from "./helpers.js";

const client = new BBCFx();

// ─── Single Continent ─────────────────────────────────────────────────────────

test("Test_WithContinent_Europe_SetsContinentsArray", async () => {
    await client.search(new BBCFxRequestBuilder().withContinent("Europe"));

    const body = lastFetchBody();
    assert(Array.isArray(body.continents));
    assert(body.continents?.includes("Europe"));
    assert(body.continents?.length === 1);
});

test("Test_WithContinent_Asia_SetsContinentsArray", async () => {
    await client.search(new BBCFxRequestBuilder().withContinent("Asia"));

    const body = lastFetchBody();
    assert(body.continents?.includes("Asia"));
});

// ─── Multiple Continents (chained) ────────────────────────────────────────────

test("Test_WithContinent_ChainedTwice_SetsBothContinents", async () => {
    await client.search(new BBCFxRequestBuilder()
        .withContinent("Europe")
        .withContinent("Africa")
    );

    const body = lastFetchBody();
    assert(body.continents?.length === 2);
    assert(body.continents?.includes("Europe"));
    assert(body.continents?.includes("Africa"));
});

// ─── withContinents (bulk) ────────────────────────────────────────────────────

test("Test_WithContinents_SetsAllContinents", async () => {
    await client.search(new BBCFxRequestBuilder()
        .withContinents(["Asia", "Oceania", "Antarctica"])
    );

    const body = lastFetchBody();
    assert(body.continents?.length === 3);
    assert(body.continents?.includes("Asia"));
    assert(body.continents?.includes("Oceania"));
    assert(body.continents?.includes("Antarctica"));
});
