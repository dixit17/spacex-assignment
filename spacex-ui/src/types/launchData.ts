export interface LaunchData {
    id: string;
    name: string;
    date: string;
    success: boolean;
    details: string;
    rocket: string;
    image: string;
    article: string;
    wikipedia: string;
    webcast: string;
    upcoming: boolean;
    failures: LaunchFailure[];
    searchText: string;
}

export interface LaunchFailure {
    time: number;
    altitude: number | null;
    reason: string;
}