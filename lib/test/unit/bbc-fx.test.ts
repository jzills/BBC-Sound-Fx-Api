import { describe, expect, it, vi } from "vitest";
import BBCFx, { BBCFxError } from "../../src/bbc-fx";
import BBCFxRequestBuilder from "../../src/bbc-fx-request-builder";

const client = new BBCFx();

describe("BBCFx.search error handling", () => {
    it("throws BBCFxError on non-ok response", async () => {
        vi.mocked(fetch).mockResolvedValueOnce({
            ok: false,
            status: 503,
            text: () => Promise.resolve("Service Unavailable"),
        } as any);
        const error = await client.search(new BBCFxRequestBuilder()).catch(e => e);
        expect(error).toBeInstanceOf(BBCFxError);
        expect(error.status).toBe(503);
        expect(error.message).toBe("Service Unavailable");
    });
});
