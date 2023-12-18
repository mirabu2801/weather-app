import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {Chart, ChartDataset, ChartOptions} from "chart.js";

import zoomPlugin from 'chartjs-plugin-zoom';
import {WeatherResponse} from "../forecast-api.service";
import {NgChartsModule} from "ng2-charts";
import {NgIf} from "@angular/common";

Chart.register(zoomPlugin)

@Component({
    selector: 'app-forecast-display',
    templateUrl: './forecast-display.component.html',
    styleUrls: ['./forecast-display.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgChartsModule,
        NgIf
    ]
})
export class ForecastDisplayComponent  {

    constructor(private cd: ChangeDetectorRef) {
    }

    _weatherData: WeatherResponse | undefined
    @Input()
    set weatherData(data: WeatherResponse | undefined) {
        this._weatherData = data;
        if (data) {
            this.populateChartData(data);
        }
        this.cd.markForCheck();
    }

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

    private populateChartData(data: WeatherResponse): void {
        this.lineChartLabels = data.data.timelines[0].intervals.map(entry => this.formatDateString(entry.startTime));
        this.lineChartData[0].data = data.data.timelines[0].intervals.map(entry => entry.values.temperature);
        this.lineChartData[1].data = data.data.timelines[0].intervals.map(entry => entry.values.temperatureApparent);
        this.cd.markForCheck();
    }

}
