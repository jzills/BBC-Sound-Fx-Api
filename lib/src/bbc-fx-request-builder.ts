import DurationQueryBuilder from "./builders/duration-query-builder";
import LocationQueryBuilder from "./builders/location-query-builder";
import CategoryQueryBuilder from "./builders/category-query-builder";
import QueryBuilder from "./builders/query-builder";

export default class BBCFxRequestBuilder extends
    DurationQueryBuilder(
        LocationQueryBuilder(
            CategoryQueryBuilder(QueryBuilder)))
{
}
