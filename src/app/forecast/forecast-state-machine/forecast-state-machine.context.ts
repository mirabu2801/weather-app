import {WeatherData} from "../forecast-api.service";

export interface ForecastStateMachineContext {
    data?: WeatherData;
    error?: string;
}
