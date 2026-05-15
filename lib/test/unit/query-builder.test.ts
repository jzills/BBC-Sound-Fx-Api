import { assert, test } from "vitest";

import QueryBuilder from "../../src/builders/query-builder.js";
import BBCFx from "../../src/bbc-fx.js";
import { lastFetchBody, lastFetchUrl } from "./helpers.js";

const client = new BBCFx();

// ─── Query ────────────────────────────────────────────────────────────────────

test("Test_WithQuery_SetsQueryCriteria", async () => {
    await client.search(new QueryBuilder().withQuery("rain"));

    const body = lastFetchBody();
    assert(body.q === "rain");
});

// ─── Size ─────────────────────────────────────────────────────────────────────

test("Test_WithSize_1_ReturnsOneResult", async () => {
    const { results } = await client.search(new QueryBuilder().withSize(1));

    const body = lastFetchBody();
    assert(results.length === 1);
    assert(body.size === 1);
});

test("Test_WithSize_3_ReturnsThreeResults", async () => {
    const { results } = await client.search(new QueryBuilder().withSize(3));

    const body = lastFetchBody();
    assert(results.length === 3);
    assert(body.size === 3);
});

// ─── From ─────────────────────────────────────────────────────────────────────

test("Test_WithFrom_SetsFromCriteria", async () => {
    await client.search(new QueryBuilder().withFrom(10));

    const body = lastFetchBody();
    assert(body.from === 10);
});

// ─── SortBy ───────────────────────────────────────────────────────────────────

test("Test_WithSortBy_SetsSortByCriteria", async () => {
    await client.search(new QueryBuilder().withSortBy("duration_asc"));

    const body = lastFetchBody();
    assert(body.sortBy === "duration_asc");
});

// ─── Chaining ─────────────────────────────────────────────────────────────────

test("Test_Chaining_QueryAndSize", async () => {
    await client.search(new QueryBuilder().withQuery("thunder").withSize(2));

    const body = lastFetchBody();
    assert(body.q === "thunder");
    assert(body.size === 2);
});

// ─── POST to correct endpoint ─────────────────────────────────────────────────

test("Test_Search_PostsToCorrectUrl", async () => {
    await client.search(new QueryBuilder().withQuery("rain"));

    const url = lastFetchUrl();
    assert(url === `${BBCFx.BASE_URL}/api/sfx/search`);
});
