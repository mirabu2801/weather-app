import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-forecast-weather-type-icon',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './forecast-weather-type-icon.component.html',
  styleUrl: './forecast-weather-type-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForecastWeatherTypeIconComponent {
  @Input()
  iconId: number | undefined

}
