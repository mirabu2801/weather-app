import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";

export interface WeatherResponse {
    data: {
        timelines: Timeline[];
    }

}

export interface Timeline {
    timestep: string;
    endTime: string;
    startTime: string;
    intervals: Interval[];
}

export interface Interval {
    startTime: string;
    values: {
        temperature: number;
        temperatureApparent: number;
    };
}

@Injectable({
    providedIn: 'root'
})
export class ForecastApiService {

    constructor(
        private httpClient: HttpClient,
    ) {
    }

    getWeatherData(location: string): Observable<WeatherResponse> {
        return this.httpClient.post<WeatherResponse>('/v4/timelines?apikey=lYR1y7jz5OlR4lXLfGMJxrGcySwPYQSJ', {
            location,
            fields: [
                "temperature",
                "temperatureApparent"
            ],
            units: "metric",
            timesteps: [
                "1h"
            ],
            startTime: "now",
            endTime: "nowPlus120h"
        });
    }
}
