export interface BBCSound {
    id: string;
    description: string;
    duration: number;
    categories: { className: string; p: number }[];
    location: { continent: string };
    tags: string[];
    source: string;
    technicalMetadata: {
        file_name: string;
        sample_rate: string;
        bits_per_sample: number;
        channels: number;
        duration: string;
    };
    additionalMetadata: {
        usage: string;
        locationText: string;
        habitat: string;
        recordist: string;
        bandDescription: string;
    };
    fileSizes: {
        wavFileSize: string;
        mp3FileSize: string;
    };
    file: {
        small: { name: string; bitrate: string };
        original: { name: string; bitrate: string };
    };
}

export interface BBCFxResponse {
    total: number;
    results: BBCSound[];
}

export interface AggregationResponse {
    aggregations: Record<string, { doc_count: number }>;
}
