import {Component} from '@angular/core';
import {ForecastStateMachineService} from "./forecast-state-machine/forecast-state-machine.service";
import {AsyncPipe, NgIf} from "@angular/common";
import {ForecastLoadingComponent} from "./forecast-loading/forecast-loading.component";
import {ForecastErrorComponent} from "./forecast-error/forecast-error.component";
import {ForecastDisplayComponent} from "./forecast-display/forecast-display.component";
import {ForecastNoLocationComponent} from "./forecast-no-location/forecast-no-location.component";

@Component({
    selector: 'app-forecast',
    standalone: true,
    imports: [
        AsyncPipe,
        NgIf,
        ForecastLoadingComponent,
        ForecastErrorComponent,
        ForecastDisplayComponent,
        ForecastNoLocationComponent,
    ],
    templateUrl: './forecast.component.html',
    styleUrl: './forecast.component.scss',
    providers: [ForecastStateMachineService],
})
export class ForecastComponent {
    state$ = this.forecastMachine.state$;


    constructor(
        private forecastMachine: ForecastStateMachineService,
    ) {
    }

    isLoadingState(state: string): boolean {
        return state === "loading";
    }

    isErrorState(state: string): boolean {
        return state === "failure";
    }

    isDataLoaded(state: string): boolean {
        return state === "success";
    }

    isNoLocation(state: string): boolean {
        return state === "noLocation";
    }
}
