import { afterAll, beforeAll, beforeEach, vi } from "vitest";
import fixture from "./fixtures/search-response.json";

beforeAll(() => {
    vi.stubGlobal("fetch", vi.fn().mockImplementation((_url: string, options?: RequestInit) => {
        const body = options?.body ? JSON.parse(options.body as string) : {};
        const limit = body?.criteria?.size ?? fixture.results.length;
        return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ ...fixture, results: fixture.results.slice(0, limit) }),
            text: () => Promise.resolve(""),
        });
    }));
});

beforeEach(() => {
    vi.clearAllMocks();
});

afterAll(() => {
    vi.unstubAllGlobals();
});
