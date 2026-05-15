import { BBCCategory } from "../../types/bbc-fx-criteria";

export interface ICategoryQueryBuilder {
    withCategory(value: BBCCategory): this;
    withCategories(values: BBCCategory[]): this;
}
