import { BBCFx, BBCFxRequestBuilder } from "../../src/index.js";

async function sample() {
    const client = new BBCFx();

    console.log("Searching for rain sounds in Europe (30-60 seconds)...");
    const results = await client.search(
        new BBCFxRequestBuilder()
            .withQuery("rain")
            .withCategory("Nature")
            .withContinent("Europe")
            .withDuration("30-60")
            .withSize(3)
    );

    console.log(`Total matching: ${results.total}`);
    for (const sound of results.results) {
        console.log(`\n  [${sound.id}] ${sound.description}`);
        console.log(`  Tags: ${sound.tags.join(", ")}`);
        console.log(`  Location: ${sound.additionalMetadata.locationText}`);
        console.log(`  MP3 URL: ${client.getDownloadUrl(sound, "mp3")}`);
        console.log(`  WAV URL: ${client.getDownloadUrl(sound, "wav")}`);
    }

    console.log("\n\nFetching category aggregations...");
    const cats = await client.categories();
    const top5 = Object.entries(cats.aggregations)
        .sort((a, b) => b[1].doc_count - a[1].doc_count)
        .slice(0, 5);
    console.log("Top 5 categories:");
    for (const [name, { doc_count }] of top5) {
        console.log(`  ${name}: ${doc_count}`);
    }
}

sample().catch(console.error);
