import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";

export type WeatherData = WeatherResponse & { location: string }

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
    weatherCode: number;
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
    return this.httpClient.post<WeatherResponse>('/v4/timelines?apikey=x49XXGrqwNaEpLsuxzxstb19zRjVinGB', {
      location,
      fields: [
        "temperature",
        "temperatureApparent",
        "weatherCode",
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
