import { BBCDuration } from "../types/bbc-fx-criteria";
import { Constructor } from "../types/constructor";
import { IDurationQueryBuilder } from "./interfaces/duration-query-builder.interface";
import QueryBuilder from "./query-builder";

export default function DurationQueryBuilder<T extends Constructor<QueryBuilder>>(Base: T): T & Constructor<IDurationQueryBuilder> {
    return class extends Base {
        /** @inheritdoc */
        withDuration(value: BBCDuration): this {
            this.criteria.durations = [...(this.criteria.durations ?? []), value];
            return this;
        }

        /** @inheritdoc */
        withDurations(values: BBCDuration[]): this {
            this.criteria.durations = [...(this.criteria.durations ?? []), ...values];
            return this;
        }
    };
}
