import { assert, test } from "vitest";

import BBCFxRequestBuilder from "../../src/bbc-fx-request-builder.js";
import BBCFx from "../../src/bbc-fx.js";
import { lastFetchBody } from "./helpers.js";

const client = new BBCFx();

// ─── Single Category ──────────────────────────────────────────────────────────

test("Test_WithCategory_Nature_SetsCategoryArray", async () => {
    await client.search(new BBCFxRequestBuilder().withCategory("Nature"));

    const body = lastFetchBody();
    assert(Array.isArray(body.categories));
    assert(body.categories?.includes("Nature"));
    assert(body.categories?.length === 1);
});

test("Test_WithCategory_Transport_SetsCategoryArray", async () => {
    await client.search(new BBCFxRequestBuilder().withCategory("Transport"));

    const body = lastFetchBody();
    assert(body.categories?.includes("Transport"));
});

// ─── Multiple Categories (chained) ────────────────────────────────────────────

test("Test_WithCategory_ChainedTwice_SetsBothCategories", async () => {
    await client.search(new BBCFxRequestBuilder()
        .withCategory("Nature")
        .withCategory("Birds")
    );

    const body = lastFetchBody();
    assert(body.categories?.length === 2);
    assert(body.categories?.includes("Nature"));
    assert(body.categories?.includes("Birds"));
});

// ─── withCategories (bulk) ────────────────────────────────────────────────────

test("Test_WithCategories_SetsAllCategories", async () => {
    await client.search(new BBCFxRequestBuilder()
        .withCategories(["Animals", "Bells", "Fire"])
    );

    const body = lastFetchBody();
    assert(body.categories?.length === 3);
    assert(body.categories?.includes("Animals"));
    assert(body.categories?.includes("Bells"));
    assert(body.categories?.includes("Fire"));
});

test("Test_WithCategory_Then_WithCategories_Accumulates", async () => {
    await client.search(new BBCFxRequestBuilder()
        .withCategory("Clocks")
        .withCategories(["Military", "Sport"])
    );

    const body = lastFetchBody();
    assert(body.categories?.length === 3);
    assert(body.categories?.includes("Clocks"));
    assert(body.categories?.includes("Military"));
    assert(body.categories?.includes("Sport"));
});
