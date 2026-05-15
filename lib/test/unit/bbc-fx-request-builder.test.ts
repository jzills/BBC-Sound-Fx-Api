import { assert, test } from "vitest";

import BBCFxRequestBuilder from "../../src/bbc-fx-request-builder.js";
import BBCFx from "../../src/bbc-fx.js";
import { lastFetchBody, lastFetchUrl } from "./helpers.js";

const client = new BBCFx();

// ─── Full criteria ────────────────────────────────────────────────────────────

test("Test_FullCriteria_AllFiltersPresent", async () => {
    await client.search(new BBCFxRequestBuilder()
        .withQuery("thunder")
        .withCategory("Nature")
        .withContinent("Europe")
        .withDuration("30-60")
        .withSize(5)
        .withFrom(0)
    );

    const body = lastFetchBody();
    assert(body.q === "thunder");
    assert(body.categories?.includes("Nature"));
    assert(body.continents?.includes("Europe"));
    assert(body.durations?.includes("30-60"));
    assert(body.size === 5);
    assert(body.from === 0);
});

test("Test_MultipleFilters_AllAccumulate", async () => {
    await client.search(new BBCFxRequestBuilder()
        .withCategories(["Nature", "Birds"])
        .withContinents(["Europe", "Asia"])
        .withDurations(["0-9", "10-30"])
    );

    const body = lastFetchBody();
    assert(body.categories?.length === 2);
    assert(body.continents?.length === 2);
    assert(body.durations?.length === 2);
});

// ─── Download URL ─────────────────────────────────────────────────────────────

test("Test_GetDownloadUrl_Mp3_ReturnsCorrectUrl", () => {
    const sound = {
        file: {
            small: { name: "NHU05104088", bitrate: "128kbps" },
            original: { name: "NHU05104088", bitrate: "" },
        },
    } as any;

    const url = client.getDownloadUrl(sound, "mp3");
    assert(url === `${BBCFx.MEDIA_URL}/mp3/NHU05104088.mp3`);
});

test("Test_GetDownloadUrl_Wav_ReturnsCorrectUrl", () => {
    const sound = {
        file: {
            small: { name: "NHU05104088", bitrate: "128kbps" },
            original: { name: "NHU05104088", bitrate: "" },
        },
    } as any;

    const url = client.getDownloadUrl(sound, "wav");
    assert(url === `${BBCFx.MEDIA_URL}/wav/NHU05104088.wav`);
});

// ─── Response shape ───────────────────────────────────────────────────────────

test("Test_Search_ResponseHasTotalAndResults", async () => {
    const response = await client.search(new BBCFxRequestBuilder().withQuery("rain"));

    assert(typeof response.total === "number");
    assert(Array.isArray(response.results));
});

test("Test_Search_ResultHasExpectedFields", async () => {
    const { results } = await client.search(new BBCFxRequestBuilder().withSize(1));

    assert(results.length === 1);
    const sound = results[0];
    assert(typeof sound.id === "string");
    assert(typeof sound.description === "string");
    assert(Array.isArray(sound.tags));
    assert(sound.file?.small?.name !== undefined);
});

// ─── Endpoint routing ─────────────────────────────────────────────────────────

test("Test_Search_PostsToSearchEndpoint", async () => {
    await client.search(new BBCFxRequestBuilder());

    const url = lastFetchUrl();
    assert(url.endsWith("/api/sfx/search"));
});
