import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {Chart, ChartDataset, ChartOptions} from "chart.js";

import zoomPlugin from 'chartjs-plugin-zoom';
import {WeatherData,} from "../forecast-api.service";
import {NgChartsModule} from "ng2-charts";
import {NgForOf, NgIf} from "@angular/common";
import {ForecastWeatherTypeIconComponent} from "./forecast-weather-type-icon/forecast-weather-type-icon.component";
import {ForecastHoursDataComponent} from "./forecast-hours-data/forecast-hours-data.component";

Chart.register(zoomPlugin)

@Component({
    selector: 'app-forecast-display',
    templateUrl: './forecast-display.component.html',
    styleUrls: ['./forecast-display.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
  imports: [
    NgChartsModule,
    NgIf,
    NgForOf,
    ForecastWeatherTypeIconComponent,
    ForecastHoursDataComponent
  ]
})
export class ForecastDisplayComponent  {

    constructor(private cd: ChangeDetectorRef) {
    }

    @Input()
    weatherData: WeatherData | undefined


    lineChartData: ChartDataset[] = [
        {data: [], label: $localize`Temperature`},
        {data: [], label: $localize`Temperature apparent`}
    ];

    lineChartLabels: string[] = [];
    lineChartOptions: ChartOptions = {
        responsive: true,
        scales: {
            y: {
                ticks: {
                    callback: (value: string | number) => {
                        if (typeof value === "number") {
                            value = `${Math.round(value * 10) / 10}`
                        }
                        return `${value}°C`
                    }
                }
            }
        },
        plugins: {
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true,
                        speed: 0.0001
                    },

                    mode: 'xy',
                }
            }
        }
    };
    lineChartLegend = false;

    formatDateString(dateString: string): string {
        const date = new Date(dateString);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        if (hours === '00') {
            const day = date.getDate().toString();
            const month = date.getMonth().toString();
            return `${day}.${month} ${hours}:${minutes}`;
        }
        return `${hours}:${minutes}`;

    }

  getCurrentTemperature(): string {
    return this.weatherData!.data.timelines[0].intervals[0].values.temperature.toFixed(0);
  }

  getCurrentFeltTemperature(): string {
    return this.weatherData!.data.timelines[0].intervals[0].values.temperatureApparent.toFixed(0);
  }
}
