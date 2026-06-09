import { BBCCategory } from "./types/bbc-fx-criteria";
import { AggregationResponse, BBCFxResponse, BBCSound } from "./types/bbc-fx-response";
import QueryBuilder from "./builders/query-builder";

export class BBCFxError extends Error {
    constructor(readonly status: number, message: string) {
        super(message);
        this.name = "BBCFxError";
    }
}

export default class BBCFx {
    static readonly BASE_URL = "https://sound-effects-api.bbcrewind.co.uk";
    static readonly MEDIA_URL = "https://sound-effects-media.bbcrewind.co.uk";

    async search(builder: QueryBuilder): Promise<BBCFxResponse> {
        const response = await fetch(`${BBCFx.BASE_URL}/api/sfx/search`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ criteria: builder.build() }),
        });
        if (response.ok) {
            return response.json();
        } else {
            throw new BBCFxError(response.status, await response.text());
        }
    }

    async categories(): Promise<AggregationResponse> {
        const response = await fetch(`${BBCFx.BASE_URL}/api/sfx/cached/categoryaggregations`);
        if (response.ok) {
            return response.json();
        } else {
            throw new BBCFxError(response.status, await response.text());
        }
    }

    async continents(): Promise<AggregationResponse> {
        const response = await fetch(`${BBCFx.BASE_URL}/api/sfx/continentAggregations`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ criteria: {} }),
        });
        if (response.ok) {
            return response.json();
        } else {
            throw new BBCFxError(response.status, await response.text());
        }
    }

    async durations(): Promise<AggregationResponse> {
        const response = await fetch(`${BBCFx.BASE_URL}/api/sfx/durationAggregations`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ criteria: {} }),
        });
        if (response.ok) {
            return response.json();
        } else {
            throw new BBCFxError(response.status, await response.text());
        }
    }

    async browse(category: BBCCategory): Promise<BBCFxResponse> {
        const response = await fetch(`${BBCFx.BASE_URL}/api/sfx/cached/categorysearch/${encodeURIComponent(category)}`);
        if (response.ok) {
            return response.json();
        } else {
            throw new BBCFxError(response.status, await response.text());
        }
    }

    async cachedSearch(query: string): Promise<BBCFxResponse> {
        const response = await fetch(`${BBCFx.BASE_URL}/api/sfx/cached/search?q=${encodeURIComponent(query)}`);
        if (response.ok) {
            return response.json();
        } else {
            throw new BBCFxError(response.status, await response.text());
        }
    }

    getDownloadUrl(sound: BBCSound, format: "mp3" | "wav"): string {
        const id = format === "mp3" ? sound.file.small.name : sound.file.original.name;
        return `${BBCFx.MEDIA_URL}/${format}/${id}.${format}`;
    }
}
