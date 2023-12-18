import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {ForecastStateMachineService} from "../forecast-state-machine/forecast-state-machine.service";

@Component({
    selector: 'app-forecast-error',
    standalone: true,
    imports: [
        MatCardModule,
        NgIf,
        MatButtonModule,
        MatIconModule,
    ],
    templateUrl: './forecast-error.component.html',
    styleUrl: './forecast-error.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForecastErrorComponent {

    @Input()
    error: string | undefined;

    constructor(private forecastMachine: ForecastStateMachineService) {
    }

    reloadData(): void {
        this.forecastMachine.retry();
    }
}
