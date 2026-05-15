import { BBCFxCriteria } from "../types/bbc-fx-criteria";

export default class QueryBuilder {
    protected criteria: BBCFxCriteria = {};

    withQuery(value: string): this {
        this.criteria.q = value;
        return this;
    }

    withSize(value: number): this {
        this.criteria.size = value;
        return this;
    }

    withFrom(value: number): this {
        this.criteria.from = value;
        return this;
    }

    withSortBy(value: string): this {
        this.criteria.sortBy = value;
        return this;
    }

    /** @internal */
    build(): BBCFxCriteria {
        return this.criteria;
    }
}
