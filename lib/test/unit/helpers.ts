import { vi } from "vitest";
import { BBCFxCriteria } from "../../src/types/bbc-fx-criteria";

export function lastFetchBody(): BBCFxCriteria {
    const options = vi.mocked(fetch).mock.calls.at(-1)![1] as RequestInit;
    return JSON.parse(options.body as string).criteria as BBCFxCriteria;
}

export function lastFetchUrl(): string {
    return vi.mocked(fetch).mock.calls.at(-1)![0] as string;
}
