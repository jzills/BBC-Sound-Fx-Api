import { BBCContinent } from "../types/bbc-fx-criteria";
import { Constructor } from "../types/constructor";
import { ILocationQueryBuilder } from "./interfaces/location-query-builder.interface";
import QueryBuilder from "./query-builder";

export default function LocationQueryBuilder<T extends Constructor<QueryBuilder>>(Base: T): T & Constructor<ILocationQueryBuilder> {
    return class extends Base {
        /** @inheritdoc */
        withContinent(value: BBCContinent): this {
            this.criteria.continents = [...(this.criteria.continents ?? []), value];
            return this;
        }

        /** @inheritdoc */
        withContinents(values: BBCContinent[]): this {
            this.criteria.continents = [...(this.criteria.continents ?? []), ...values];
            return this;
        }
    };
}
