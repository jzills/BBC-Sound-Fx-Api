import { assert, test } from "vitest";

import BBCFx from "../../src/bbc-fx.js";
import BBCFxRequestBuilder from "../../src/bbc-fx-request-builder.js";

const client = new BBCFx();

// ─── Search ───────────────────────────────────────────────────────────────────

test("Test_Search_WithQuery_ReturnsResults", async () => {
    const { total, results } = await client.search(
        new BBCFxRequestBuilder().withQuery("rain").withSize(5)
    );

    assert(total > 0);
    assert(results.length > 0);
    assert(results.length <= 5);
});

test("Test_Search_WithCategory_Nature_ReturnsResults", async () => {
    const { results } = await client.search(
        new BBCFxRequestBuilder().withCategory("Nature").withSize(3)
    );

    assert(results.length > 0);
    assert(results.every(r => r.categories.some(c => c.className === "Nature")));
});

test("Test_Search_WithContinent_Antarctica_NarrowsTotal", async () => {
    const { total } = await client.search(
        new BBCFxRequestBuilder().withContinent("Antarctica").withSize(3)
    );

    assert(total < 1000);
});

test("Test_Search_WithDuration_ReturnsResults", async () => {
    const { results } = await client.search(
        new BBCFxRequestBuilder().withDuration("0-9").withSize(5)
    );

    assert(results.length > 0);
});

test("Test_Search_WithFrom_ReturnsDifferentResults", async () => {
    const page1 = await client.search(
        new BBCFxRequestBuilder().withQuery("rain").withSize(3).withFrom(0)
    );
    const page2 = await client.search(
        new BBCFxRequestBuilder().withQuery("rain").withSize(3).withFrom(3)
    );

    const ids1 = page1.results.map(r => r.id);
    const ids2 = page2.results.map(r => r.id);

    assert(page1.results.length > 0);
    assert(page2.results.length > 0);
    assert(!ids1.some(id => ids2.includes(id)));
});

test("Test_Search_FullCriteria_ReturnsResults", async () => {
    const { total, results } = await client.search(
        new BBCFxRequestBuilder()
            .withQuery("rain")
            .withCategory("Nature")
            .withContinent("Europe")
            .withDuration("30-60")
            .withSize(5)
    );

    assert(typeof total === "number");
    assert(Array.isArray(results));
});

// ─── Aggregations ─────────────────────────────────────────────────────────────

test("Test_Categories_ReturnsAggregations", async () => {
    const { aggregations } = await client.categories();

    assert(typeof aggregations === "object");
    assert("Nature" in aggregations);
    assert(aggregations["Nature"].doc_count > 0);
});

test("Test_Continents_ReturnsAggregations", async () => {
    const { aggregations } = await client.continents();

    assert(typeof aggregations === "object");
    assert("Europe" in aggregations);
    assert(aggregations["Europe"].doc_count > 0);
});

test("Test_Durations_ReturnsAggregations", async () => {
    const { aggregations } = await client.durations();

    assert(typeof aggregations === "object");
    const keys = Object.keys(aggregations);
    assert(keys.length > 0);
});

// ─── Browse ───────────────────────────────────────────────────────────────────

test("Test_Browse_Nature_ReturnsResults", async () => {
    const { results } = await client.browse("Nature");

    assert(results.length > 0);
    assert(results.every(r => r.categories.some(c => c.className === "Nature")));
});

// ─── Cached Search ────────────────────────────────────────────────────────────

test("Test_CachedSearch_ReturnsResults", async () => {
    const { total, results } = await client.cachedSearch("rain");

    assert(total > 0);
    assert(results.length > 0);
});

// ─── Download URL ─────────────────────────────────────────────────────────────

test("Test_GetDownloadUrl_ReturnsValidUrl", async () => {
    const { results } = await client.search(
        new BBCFxRequestBuilder().withSize(1)
    );

    assert(results.length === 1);
    const sound = results[0];

    const mp3Url = client.getDownloadUrl(sound, "mp3");
    const wavUrl = client.getDownloadUrl(sound, "wav");

    assert(mp3Url.endsWith(".mp3"));
    assert(wavUrl.endsWith(".wav"));
    assert(mp3Url.includes(BBCFx.MEDIA_URL));
    assert(wavUrl.includes(BBCFx.MEDIA_URL));
});

// ─── Response shape ───────────────────────────────────────────────────────────

test("Test_Search_SoundHasRequiredFields", async () => {
    const { results } = await client.search(
        new BBCFxRequestBuilder().withSize(1)
    );

    assert(results.length === 1);
    const sound = results[0];

    assert(typeof sound.id === "string");
    assert(typeof sound.description === "string");
    assert(typeof sound.duration === "number");
    assert(Array.isArray(sound.categories));
    assert(Array.isArray(sound.tags));
    assert(sound.file?.small?.name !== undefined);
    assert(sound.file?.original?.name !== undefined);
    assert(sound.fileSizes?.mp3FileSize !== undefined);
    assert(sound.fileSizes?.wavFileSize !== undefined);
});
