import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'app-forecast-no-location',
    standalone: true,
    imports: [],
    templateUrl: './forecast-no-location.component.html',
    styleUrl: './forecast-no-location.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForecastNoLocationComponent {

}
