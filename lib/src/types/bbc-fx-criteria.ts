export type BBCCategory =
    | "Nature"
    | "Bells"
    | "Destruction"
    | "Daily_Life"
    | "Electronics"
    | "Crowds"
    | "Birds"
    | "Industry"
    | "Footsteps"
    | "Toys"
    | "Sport"
    | "Animals"
    | "Events"
    | "Applause"
    | "Atmosphere"
    | "Fire"
    | "Medical"
    | "Comedy"
    | "Transport"
    | "Machines"
    | "Aircraft"
    | "Military"
    | "Clocks";

export type BBCContinent =
    | "Europe"
    | "Asia"
    | "North America"
    | "South America"
    | "Africa"
    | "Antarctica"
    | "Oceania";

export type BBCDuration =
    | "0-9"
    | "10-30"
    | "30-60"
    | "60-120"
    | "120-300"
    | "300-600"
    | "600-3600";

export interface BBCFxCriteria {
    q?: string;
    categories?: BBCCategory[];
    continents?: BBCContinent[];
    durations?: BBCDuration[];
    size?: number;
    from?: number;
    sortBy?: string;
}
