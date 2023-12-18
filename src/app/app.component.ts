import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ForecastComponent} from "./forecast/forecast.component";
import {HeaderComponent} from "./header/header.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ForecastComponent,
        HeaderComponent
    ]
})
export class AppComponent {
}
