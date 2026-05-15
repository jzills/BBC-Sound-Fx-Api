import { BBCContinent } from "../../types/bbc-fx-criteria";

export interface ILocationQueryBuilder {
    withContinent(value: BBCContinent): this;
    withContinents(values: BBCContinent[]): this;
}
