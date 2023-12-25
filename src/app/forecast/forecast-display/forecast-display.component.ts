import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input} from '@angular/core';
import {Chart, ChartDataset, ChartOptions} from "chart.js";

import zoomPlugin from 'chartjs-plugin-zoom';
import {WeatherData, WeatherValues,} from "../forecast-api.service";
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
export class ForecastDisplayComponent {

  static CLOUDY_PATH = 'assets/cloudy.png';
  static FULL_CLOUDY_PATH = 'assets/full_cloudy.png';
  static RAIN_PATH = 'assets/rain.png';
  static SNOW_PATH = 'assets/snow.png';
  static SUNNY_PATH = 'assets/sunny.png';


  constructor() {
  }

  @HostBinding('style.--background-image')
  get backgroundImage() {
    const imagePath = this.backgroundImagePath;
    return `url("${imagePath}")`;
  }
  get backgroundImagePath(): string {
    const currentWeather = this.currentWeather
    if (!currentWeather) {
      return ''
    }
    switch (currentWeather.weatherCode) {
      case 1000:
        return ForecastDisplayComponent.SUNNY_PATH;
      case 1100:
      case 1101:
      case 1102:
        return ForecastDisplayComponent.CLOUDY_PATH;
      case 1001:
      case 2000:
      case 2100:
        return ForecastDisplayComponent.FULL_CLOUDY_PATH;
      case 4201:
      case 4200:
      case 4000:
      case 4001:
        return ForecastDisplayComponent.RAIN_PATH;
      case 5000:
      case 5001:
      case 5101:
        return ForecastDisplayComponent.SNOW_PATH;
    }
    return '';
  }

  @Input()
  weatherData: WeatherData | undefined

  get currentWeather(): WeatherValues | undefined  {
    return this.weatherData?.data.timelines[0].intervals[0].values
  }

  getCurrentTemperature(): string {
    return this.currentWeather!.temperature.toFixed(0);
  }

  getCurrentFeltTemperature(): string {
    return this.currentWeather!.temperatureApparent.toFixed(0);
  }
}
