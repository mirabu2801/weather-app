import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Interval, Timeline} from "../../forecast-api.service";
import {NgForOf, NgIf} from "@angular/common";
import {ForecastWeatherTypeIconComponent} from "../forecast-weather-type-icon/forecast-weather-type-icon.component";

@Component({
  selector: 'app-forecast-hours-data',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ForecastWeatherTypeIconComponent
  ],
  templateUrl: './forecast-hours-data.component.html',
  styleUrl: './forecast-hours-data.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForecastHoursDataComponent {
  @Input()
  timeline: Timeline | undefined


  getTimeLabel(hourData: Interval): string | number {
    const date = new Date(hourData.startTime);
    return date.getHours().toString().padStart(2, '0');
  }

  formatTemperature(hourData: Interval): string {
    return hourData.values.temperature.toFixed(0);
  }

}
