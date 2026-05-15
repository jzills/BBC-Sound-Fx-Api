import { assert, test } from "vitest";

import BBCFxRequestBuilder from "../../src/bbc-fx-request-builder.js";
import BBCFx from "../../src/bbc-fx.js";
import { lastFetchBody } from "./helpers.js";

const client = new BBCFx();

// ─── Single Duration ──────────────────────────────────────────────────────────

test("Test_WithDuration_30_60_SetsDurationsArray", async () => {
    await client.search(new BBCFxRequestBuilder().withDuration("30-60"));

    const body = lastFetchBody();
    assert(Array.isArray(body.durations));
    assert(body.durations?.includes("30-60"));
    assert(body.durations?.length === 1);
});

test("Test_WithDuration_0_9_SetsDurationsArray", async () => {
    await client.search(new BBCFxRequestBuilder().withDuration("0-9"));

    const body = lastFetchBody();
    assert(body.durations?.includes("0-9"));
});

// ─── Multiple Durations (chained) ────────────────────────────────────────────

test("Test_WithDuration_ChainedTwice_SetsBothDurations", async () => {
    await client.search(new BBCFxRequestBuilder()
        .withDuration("0-9")
        .withDuration("10-30")
    );

    const body = lastFetchBody();
    assert(body.durations?.length === 2);
    assert(body.durations?.includes("0-9"));
    assert(body.durations?.includes("10-30"));
});

// ─── withDurations (bulk) ────────────────────────────────────────────────────

test("Test_WithDurations_SetsAllDurations", async () => {
    await client.search(new BBCFxRequestBuilder()
        .withDurations(["60-120", "120-300", "300-600"])
    );

    const body = lastFetchBody();
    assert(body.durations?.length === 3);
    assert(body.durations?.includes("60-120"));
    assert(body.durations?.includes("120-300"));
    assert(body.durations?.includes("300-600"));
});
