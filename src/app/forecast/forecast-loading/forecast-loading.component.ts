import {Component} from '@angular/core';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
    selector: 'app-forecast-loading',
    standalone: true,
    imports: [
        MatProgressSpinnerModule
    ],
    templateUrl: './forecast-loading.component.html',
    styleUrl: './forecast-loading.component.scss'
})
export class ForecastLoadingComponent {

}
