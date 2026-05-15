import { BBCCategory } from "../types/bbc-fx-criteria";
import { Constructor } from "../types/constructor";
import { ICategoryQueryBuilder } from "./interfaces/category-query-builder.interface";
import QueryBuilder from "./query-builder";

export default function CategoryQueryBuilder<T extends Constructor<QueryBuilder>>(Base: T): T & Constructor<ICategoryQueryBuilder> {
    return class extends Base {
        /** @inheritdoc */
        withCategory(value: BBCCategory): this {
            this.criteria.categories = [...(this.criteria.categories ?? []), value];
            return this;
        }

        /** @inheritdoc */
        withCategories(values: BBCCategory[]): this {
            this.criteria.categories = [...(this.criteria.categories ?? []), ...values];
            return this;
        }
    };
}
