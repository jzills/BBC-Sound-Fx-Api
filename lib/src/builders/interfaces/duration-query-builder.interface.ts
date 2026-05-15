import { BBCDuration } from "../../types/bbc-fx-criteria";

export interface IDurationQueryBuilder {
    withDuration(value: BBCDuration): this;
    withDurations(values: BBCDuration[]): this;
}
