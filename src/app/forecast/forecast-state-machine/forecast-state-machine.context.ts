import {WeatherResponse} from "../forecast-api.service";

export interface ForecastStateMachineContext {
    data?: WeatherResponse;
    error?: string;
}
