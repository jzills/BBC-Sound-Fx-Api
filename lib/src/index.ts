import BBCFx from "./bbc-fx";
import QueryBuilder from "./builders/query-builder";
import CategoryQueryBuilder from "./builders/category-query-builder";
import LocationQueryBuilder from "./builders/location-query-builder";
import DurationQueryBuilder from "./builders/duration-query-builder";
import BBCFxRequestBuilder from "./bbc-fx-request-builder";

export type { BBCCategory, BBCContinent, BBCDuration, BBCFxCriteria } from "./types/bbc-fx-criteria";
export type { BBCSound, BBCFxResponse, AggregationResponse } from "./types/bbc-fx-response";

export {
    BBCFx,
    BBCFxRequestBuilder,
    QueryBuilder,
    CategoryQueryBuilder,
    LocationQueryBuilder,
    DurationQueryBuilder,
};
